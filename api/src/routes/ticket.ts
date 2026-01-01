import express from "express";
import { prismaClient } from "../db/db";
import { PaymentStatus } from "../generated/prisma/enums";

const router = express.Router();


router.post("/generate/:userId",async(req,res)=>{
    try {
        const userId = req.params.userId;
        const payment = await prismaClient.payment.findUnique({
            where:{
                id:req.body.payment
            }
        });

        if (payment?.paymentStatus === PaymentStatus.Paid) {

        }

    } catch (error) {
        
    }
})

export const ticketRouter = router;