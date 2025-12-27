import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";
interface AuthRequest extends Request{
    userId: string,
}

export function authMiddleware(req:AuthRequest,res:Response,next:NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({error:"Authorization header missing"})
    }
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
        error: "Invalid authorization format",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET as string
        ) as JwtPayload;
        let userId = req.userId;
        userId = decoded as any;
        if (userId === decoded.sub as string){
            console.log("Auth Success!");
            return next();
        }
        next();
    } catch (error) {
        return res.status(401).json({
        error: "Invalid or expired token",
        });    
    }
}