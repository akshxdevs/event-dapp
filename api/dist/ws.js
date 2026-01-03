"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
exports.subscribe = subscribe;
exports.notify = notify;
const ws_1 = require("ws");
const db_1 = require("./db/db");
const enums_1 = require("./generated/prisma/enums");
exports.wss = new ws_1.WebSocketServer({ noServer: true });
const paymentSubscriptions = new Map();
function subscribe(paymentId, ws) {
    if (!paymentSubscriptions.has(paymentId)) {
        paymentSubscriptions.set(paymentId, new Set());
    }
    paymentSubscriptions.get(paymentId).add(ws);
    ws.on("close", () => {
        var _a;
        (_a = paymentSubscriptions.get(paymentId)) === null || _a === void 0 ? void 0 : _a.delete(ws);
    });
}
function notify(paymentId, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { responseStatus } = payload;
        switch (responseStatus) {
            case enums_1.ResponseStatus.PAID:
                yield db_1.prismaClient.payment.update({
                    where: { id: paymentId },
                    data: { paymentStatus: enums_1.PaymentStatus.Paid }
                });
                break;
            case enums_1.ResponseStatus.NOT_PROCESSED:
                yield db_1.prismaClient.payment.update({
                    where: { id: paymentId },
                    data: { paymentStatus: enums_1.PaymentStatus.Refund_Intailized }
                });
                break;
            default:
                yield db_1.prismaClient.payment.update({
                    where: { id: paymentId },
                    data: { paymentStatus: enums_1.PaymentStatus.Failed }
                });
        }
        const clients = paymentSubscriptions.get(paymentId);
        if (!clients || clients.size === 0)
            return;
        const message = JSON.stringify({
            type: "PAYMENT_STATUS_UPDATE",
            paymentId,
            responseStatus
        });
        for (const ws of clients) {
            if (ws.readyState === ws_1.WebSocket.OPEN) {
                ws.send(message);
            }
        }
    });
}
