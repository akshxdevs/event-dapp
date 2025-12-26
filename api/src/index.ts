import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { userRouter } from "./routes/user";
import { eventRouter } from "./routes/event";
import { bookingRouter } from "./routes/booking";
import { paymentRouter } from "./routes/payment";
import { ticketRouter } from "./routes/ticket";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user/",userRouter);
app.use("/api/v1/event/",eventRouter);
app.use("/api/v1/booking/",bookingRouter);
app.use("/api/v1/payment/",paymentRouter);
app.use("/api/v1/ticket/",ticketRouter);

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});