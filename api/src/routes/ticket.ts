import express from "express";
import { prismaClient } from "../db/db";
import { PaymentStatus } from "../generated/prisma/enums";

const router = express.Router();


router.post("/generate/:userId",async(req,res)=>{
    try {
        const userId = req.params.userId;
        const bookingId = req.body.bookingId;
        const paymentId = req.body.paymentId;
        const totalFee = req.body.totalFee;
        const eventId = req.body.eventId;
        const quantity = req.body.quantity;

        const payment = await prismaClient.payment.findUnique({
            where:{
                id:req.body.payment
            }
        });
        if (payment?.paymentStatus === PaymentStatus.Paid) {
            const ticket = await prismaClient.ticket.create({
                data:{
                    bookingId: bookingId,
                    userId: userId,
                    paymentId:paymentId,
                    eventId:eventId,
                    totalFee:totalFee,
                    quantity:quantity,
                }
            });
            res.json({
                messsage:"Ticket generated successfully",
                ticket: ticket
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get/:userId",async(req,res)=>{
    try {
        const userId = req.params.userId;
        const tickets = await prismaClient.ticket.findFirst({
            where:{
                userId:userId
            },
        });
        
        if (!tickets) return res.status(402).json({message:"Ticket not found!"});
        res.json({
            message:"User Tickets Fetched Successfully",
            tickets:tickets

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
  }
})

export const ticketRouter = router;