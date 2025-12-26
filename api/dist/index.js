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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user/", user_1.userRouter);
app.use("/api/v1/event/", event_1.eventRouter);
app.use("/api/v1/booking/", booking_1.bookingRouter);
app.use("/api/v1/payment/", payment_1.paymentRouter);
app.use("/api/v1/ticket/", ticket_1.ticketRouter);
app.listen(config_1.PORT, () => {
    console.log(`server running on port ${config_1.PORT}`);
});
