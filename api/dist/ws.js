"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
exports.subscribe = subscribe;
exports.notify = notify;
const ws_1 = require("ws");
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
    const clients = paymentSubscriptions.get(paymentId);
    if (!clients)
        return;
    for (const ws of clients) {
        if (ws.readyState === ws_1.WebSocket.OPEN) {
            ws.send(JSON.stringify(payload));
        }
    }
}
