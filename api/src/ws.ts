import { WebSocketServer, WebSocket } from "ws";

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

export function notify(paymentId: string, payload: unknown) {
  const clients = paymentSubscriptions.get(paymentId);
  if (!clients) return;

  for (const ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }
}