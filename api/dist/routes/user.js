"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("../types");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const db_1 = require("../db/db");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = types_1.signupSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Invalid Input", error: body.error.message });
        }
        const existingUser = yield db_1.prismaClient.user.findFirst({
            where: {
                email: body.data.email
            }
        });
        if (existingUser) {
            return res.status(402).json({ message: "User Already Exist.." });
        }
        const hashedPassword = yield bcrypt_1.default.hash(body.data.password, 10);
        const user = yield db_1.prismaClient.user.create({
            data: {
                email: body.data.email,
                password: hashedPassword,
            }
        });
        res.json({
            message: "Signup Sucessfull",
            user: user.id,
            userEmail: user.email,
            createdAt: user.createdAt
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(403).send({ error: "Error: Something went wrong!" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = types_1.loginSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Invalid Input", error: body.error.message });
        }
        const user = yield db_1.prismaClient.user.findFirst({
            where: {
                email: body.data.email
            }
        });
        if (!user) {
            return res.status(402).json({ message: "Trouble loging in user Not exist" });
        }
        const passwordCompare = yield bcrypt_1.default.compare(body.data.password, user.password);
        if (!passwordCompare) {
            return res.status(402).json({ message: "Trouble loging in user Not exist" });
        }
        ;
        const token = jsonwebtoken_1.default.sign({ sub: user.id }, config_1.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: "Login Successfull",
            token: token
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(403).send({ error: "Error: Something went wrong!" });
    }
}));
exports.userRouter = router;
