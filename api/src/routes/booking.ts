import express from "express";
import { prismaClient } from "../db/db";

const router = express.Router();

router.get("/book/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const booking = await prismaClient.booking.findFirst({
      where:{
        userId:userId,
        eventId:req.body.eventId
      }
    });
    if (!booking) {
      return res.status(402).json({message:"Not Found!"})
    }
    res.json({
      message:"Fetched Sucessfully",
      booking:booking,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/book/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const booking = await prismaClient.booking.create({
      data:{
        eventId:eventId,
        userId:req.body.userId,
      }
    })
    res.status(200).json({
      message:"Booking successfull",
      booking_details: booking
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export const bookingRouter = router;