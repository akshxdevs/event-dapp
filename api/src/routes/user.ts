import express, { Request } from "express";
import { loginSchema, signupSchema } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { prismaClient } from "../db/db";

const router = express.Router();

router.post("/signup",async(req,res)=>{
    try {
        const body = signupSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({message:"Invalid Input", error: body.error.message});
        }
        const existingUser = await prismaClient.user.findFirst({
            where:{
                email:body.data.email
            }
        });
        if (existingUser) {
            return res.status(402).json({message:"User Already Exist.."});
        }
        const hashedPassword = await bcrypt.hash(body.data.password,10);
        const user = await prismaClient.user.create({
            data:{
                email:body.data.email,
                password:hashedPassword,
            }
        });
        res.json({
            message:"Signup Sucessfull",
            user:user.id,
            userEmail:user.email,
            createdAt: user.createdAt
        })
    } catch (error) {
        console.error((error as Error).message);
        res.status(403).send({error:"Error: Something went wrong!"})
    }
});

router.post("/login",async(req,res)=>{
    try {
        const body = loginSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({message:"Invalid Input", error: body.error.message});
        }

        const user = await prismaClient.user.findFirst({
            where:{
                email:body.data.email
            }
        });
        if (!user) {
            return res.status(402).json({message:"Trouble loging in user Not exist"});
        }
        const passwordCompare = await bcrypt.compare(body.data.password,user.password);
        if (!passwordCompare) {
            return res.status(402).json({message:"Trouble loging in user Not exist"});
        };
        const token = jwt.sign(
            {sub: user.id},JWT_SECRET as string, {expiresIn:'1h'})
        return res.status(200).json({
            message:"Login Successfull",
            token:token
        });

    } catch (error) {
        console.error((error as Error).message);
        res.status(403).send({error:"Error: Something went wrong!"})
    }
});

router.post("/update/:id",async(req,res)=>{
    try {
        const userId = req.params.id;
        const updatingOne = req.body.detail;
        switch (String(updatingOne).toLocaleLowerCase()) {
            case "username":
                try {
                    const user = await prismaClient.user.update({
                        where:{
                            id:userId,
                        },
                        data:{
                            username: req.body.username,
                        }
                    });
                    res.json({
                        message:`user: ${user.email} username added successfully`,
                    });
                } catch (error) {
                    return res.status(402).json({error: "User not created or exist"})
                };
                break    
            case "profilepic":
                try {
                    const user = await prismaClient.user.update({
                        where:{
                            id:userId,
                        },
                        data:{
                            profilePic: req.body.profilePic,
                        }
                    });
                    res.json({
                        message:`user: ${user.email} username added successfully`,
                    });
                } catch (error) {
                    return res.status(402).json({error: "User not created or exist"})
                };
                break 
            default:
                break
        };
    } catch (error) {
        console.error((error as Error).message);
        res.status(403).send({error:"Error: Something went wrong!"})
    }
});

export const userRouter = router; 