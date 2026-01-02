"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const user_1 = require("./routes/user");
const event_1 = require("./routes/event");
const booking_1 = require("./routes/booking");
const payment_1 = require("./routes/payment");
const ticket_1 = require("./routes/ticket");
const http_1 = __importDefault(require("http"));
const ws_1 = require("./ws");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user/", user_1.userRouter);
app.use("/api/v1/event/", event_1.eventRouter);
app.use("/api/v1/booking/", booking_1.bookingRouter);
app.use("/api/v1/payment/", payment_1.paymentRouter);
app.use("/api/v1/ticket/", ticket_1.ticketRouter);
server.on("upgrade", (req, socket, head) => {
    ws_1.wss.handleUpgrade(req, socket, head, (ws) => {
        const url = new URL(req.url, "http://localhost");
        const paymentId = url.searchParams.get("paymentId");
        if (!paymentId) {
            ws.close();
            return;
        }
        (0, ws_1.subscribe)(paymentId, ws);
    });
});
server.listen(config_1.PORT, () => {
    console.log(`server running on port ${config_1.PORT}`);
});
