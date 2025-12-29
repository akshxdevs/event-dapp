import z from "zod"
import { EventCategory, EventStatus } from "./generated/prisma/enums";

export const signupSchema = z.object({ 
  email:z.email(),  
  password:z.string().min(8).max(32) 
});

export const loginSchema = z.object({ 
  email:z.email(),  
  password:z.string().min(8).max(32) 
});

export const eventSchema = z.object({
  eventName: z.string().max(200).min(8),
  eventDetails: z.string().max(1000).min(10) ,
  eventImg: z.string().trim(),
  eventHostedBy: z.string(),
  eventPrice: z.int(),
  eventTags: z.string(),
  eventCategory: z.nativeEnum(EventCategory),
  eventDate: z.coerce.date(),
  EventStatus: z.nativeEnum(EventStatus).default(EventStatus.Open),
});