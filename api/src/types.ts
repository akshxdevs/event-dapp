import z from "zod"

export const signupSchema = z.object({ 
  email:z.email(),  
  password:z.string().min(8).max(32) 
});

export const loginSchema = z.object({ 
  email:z.email(),  
  password:z.string().min(8).max(32) 
});

export const eventSchema = z.object({
  eventName: z.string().max(50).min(8),
  eventDetails: z.string().max(200).min(10) ,
  eventImg: z.string().trim(),
  eventHostedBy: z.string(),
  eventPrice: z.int(),
  eventTags: z.string(),
  eventDate: z.date(),
});