import { WebSocketServer, WebSocket } from "ws";
import { prismaClient } from "./db/db";
import { PaymentStatus, ResponseStatus } from "./generated/prisma/enums";

interface PaymentStatusPayload {
  paymentId: string,
  responseStatus: ResponseStatus
}


export const wss = new WebSocketServer({noServer: true});

const paymentSubscriptions = new Map<String, Set<WebSocket>>();
export function subscribe(paymentId: string, ws: WebSocket) {
  if (!paymentSubscriptions.has(paymentId)) {
    paymentSubscriptions.set(paymentId, new Set());
  }
  paymentSubscriptions.get(paymentId)!.add(ws);

  ws.on("close", () => {
    paymentSubscriptions.get(paymentId)?.delete(ws);
  });
}

export async function notify(
  paymentId: string,
  payload: PaymentStatusPayload
) {
  const { responseStatus } = payload;

  switch (responseStatus) {
    case ResponseStatus.PAID:
      await prismaClient.payment.update({
        where: { id: paymentId },
        data: { paymentStatus: PaymentStatus.Paid }
      });
      break;

    case ResponseStatus.NOT_PROCESSED:
      await prismaClient.payment.update({
        where: { id: paymentId },
        data: { paymentStatus: PaymentStatus.Refund_Intailized }
      });
      break;

    default:
      await prismaClient.payment.update({
        where: { id: paymentId },
        data: { paymentStatus: PaymentStatus.Failed }
      });
  }

  const clients = paymentSubscriptions.get(paymentId);
  if (!clients || clients.size === 0) return;

  const message = JSON.stringify({
    type: "PAYMENT_STATUS_UPDATE",
    paymentId,
    responseStatus
  });

  for (const ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  }
}
