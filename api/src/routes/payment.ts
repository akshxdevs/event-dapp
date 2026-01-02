import express from "express";
import { prismaClient } from "../db/db";
import { PaymentMethod, PaymentStatus, ResponseStatus } from "../generated/prisma/enums";
import { notify } from "../ws";

const router = express.Router();

router.get("/get/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const payment = await prismaClient.payment.findFirst({
      where:{
        userId:userId,
      }
    });
    if (!payment) {
      return res.status(402).json({message:"Not Found!"})
    }
    res.json({
      message:"Fetched Sucessfully",
      payment:payment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/status/check/:id",async(req,res)=>{
  try {
    const paymentId = req.body.id;
    const responseStatus = req.body.responseStatus;
    const userId = req.body.userId;
    const response = await prismaClient.response.update({
     where:{
      id:req.params.id,
      paymentId:paymentId
     },
     data:{
      responseStatus:responseStatus
     }
    });
    notify(paymentId,{
      type:"PAYMENT_STATUS_UPDATE",
      paymentId,
      responseStatus
    });
    res.json({
      message:"Response updated successfully",
      response:response
    });
  }catch (error) {
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
        paymentStatus: PaymentStatus.Initailized,
        paymentMethod: PaymentMethod.UPI
      }
    });
    const response = await prismaClient.response.create({
      data: {
        paymentId:payment.id,
        userId:payment.userId,
        responseStatus:ResponseStatus.RISED
      }
    });
    const contractResponse = response.responseStatus;
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