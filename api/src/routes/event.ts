import express from "express";
import { eventSchema } from "../types";
import { prismaClient } from "../db/db";
import { authMiddleware } from "../middleware";
import { EventStatus } from "../generated/prisma/enums";

const router = express.Router();

router.post("/create",authMiddleware as any,async(req,res)=>{
    try {
        const body = eventSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({message:"Invalid Input", error: body.error.message});
        };
        const event = await prismaClient.event.create({
            data: body.data
        });
        if (!event) {
            return res.status(402).json({error: "Event not created or exist"})
        }
        res.json({
            message:"Event created successfully!",
            event:event
        })
    } catch (error) {
        console.error((error as Error).message);
        res.status(403).send({error:"Error: Something went wrong!"})
    }
});

router.get("/all",async(req,res)=>{
    try {
        const events = await prismaClient.event.findMany({
            include: {
                userEnrolled: true,
                eventLocation: true
            }
        });
        if (events) {
        return res.json({
            message:"All events Fetched successfully!",
            events:events
        });
        } res.json({
            events:[]
        });
    } catch (error) {
        console.error((error as Error).message);
        res.status(403).send({error:"Error: Something went wrong!"})
    }
});

router.get("/get/:id",async(req,res)=>{
    try {
        const eventId = req.params.id;
        const event = await prismaClient.event.findUnique({
            where:{
                id:eventId,
            }
        });
        if (!event) {
            return res.status(402).json({error: "Event not created or exist"})
        }
        res.json({
            message:`event ${event.eventName} fetched successfully`,
            event:event
        })
    } catch (error) {
        console.error((error as Error).message);
        res.status(403).send({error:"Error: Something went wrong!"})
    }
});

router.post("/update/:id",async(req,res)=>{
    try {
        const eventId = req.params.id;
        const updatingOne = req.body.detail;
        switch (updatingOne) {
            case "date":
                try {
                    const event = await prismaClient.event.update({
                        where:{
                            id:eventId,
                        },
                        data:{
                            eventDate: req.body.data,
                        }
                    });
                    res.json({
                        message:`user: ${event.eventName} date update successfully`,
                    });
                } catch (error) {
                    return res.status(402).json({error: "User not created or exist"})
                };
                break     
            case "":
                break
        };
    } catch (error) {
        console.error((error as Error).message);
        res.status(403).send({error:"Error: Something went wrong!"})
    }
});

router.post("/status/update/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const status = String(req.body.value).toLowerCase();

    if (!eventId || !status) {
      return res.status(400).json({ error: "Invalid input" });
    }

    switch (status) {
      case "ended":
        await closeEvent(eventId);
        return res.status(200).json({ message: "Event ended successfully" });
      case "closed":
      case "on-hold":
      case "postponed":
        return res.status(200).json({ message: "Status acknowledged" });

      default:
        return res.status(400).json({ error: "Invalid status value" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


async function closeEvent(eventId: string) {
  const event = await prismaClient.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  const eventDate = new Date(event.eventDate);
  const now = new Date();

  const isEventFinished = now >= eventDate;

  if (!isEventFinished) {
    throw new Error("Event has not finished yet");
  }

  await prismaClient.event.update({
    where: { id: eventId },
    data: {
      eventStatus: EventStatus.Closed,
    },
  });
}


export const eventRouter = router;