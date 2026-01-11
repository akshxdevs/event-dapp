import express from "express";
import { prismaClient } from "../db/db";
import { PaymentStatus } from "../generated/prisma/enums";

const router = express.Router();

router.get("/get/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const payment = await prismaClient.payment.findFirst({
      where:{
        userId:userId,
        eventId:req.body.eventId
      }
    });
    if (!payment) {
      return res.status(402).json({message:"Not Found!"})
    }
    res.json({
      message:"Fetched Sucessfully",
      payment:payment,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/pay/:userId", async (req, res) => {
  try {
    const paymentMethod = req.body.paymentMethod
    const payment = await prismaClient.payment.create({
      data:{
        userId:req.params.userId,
        eventId:req.body.eventId,
        paymentStatus:PaymentStatus.Initailized,
        paymentMethod:paymentMethod
      }
    });
    let response = "Paid";
    const contractResponse = response;
    switch (contractResponse.toLocaleUpperCase()) {
    case "PAID":
        await prismaClient.payment.update({
        where: { id: payment.id },
        data: { paymentStatus: PaymentStatus.Paid },
        });
        return res.status(200).json({ message: "Payment successful" });

    case "NOT_PROCESSED":
        await prismaClient.payment.update({
        where: { id: payment.id },
        data: { paymentStatus: PaymentStatus.Refund_Intailized },
        });
        return res.status(202).json({ message: "Refund initiated" });

    default:
        await prismaClient.payment.update({
        where: { id: payment.id },
        data: { paymentStatus: PaymentStatus.Failed },
        });
        return res.status(408).json({ message: "Payment failed (no response)" });
        }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export const paymentRouter = router;