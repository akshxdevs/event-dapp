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
exports.paymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const enums_1 = require("../generated/prisma/enums");
const ws_1 = require("../ws");
const router = express_1.default.Router();
router.get("/get/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const payment = yield db_1.prismaClient.payment.findFirst({
            where: {
                userId: userId,
            }
        });
        if (!payment) {
            return res.status(402).json({ message: "Not Found!" });
        }
        res.json({
            message: "Fetched Sucessfully",
            payment: payment,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
router.post("/status/check/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentId = req.body.paymentId;
        console.log({ paymentId });
        const responseStatus = req.body.responseStatus;
        const userId = req.body.userId;
        const response = yield db_1.prismaClient.response.update({
            where: {
                id: req.params.id,
                paymentId: paymentId
            },
            data: {
                responseStatus: responseStatus
            }
        });
        try {
            console.log({ paymentId });
            (0, ws_1.notify)(paymentId, {
                paymentId,
                responseStatus,
            });
            console.log("Respose sent, payment updated", responseStatus, paymentId);
        }
        catch (error) {
            console.log("Error: ", error.message);
        }
        res.json({
            message: "Response updated successfully",
            response: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
router.post("/pay/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentMethod = req.body.paymentMethod;
        const payment = yield db_1.prismaClient.payment.create({
            data: {
                userId: req.params.userId,
                paymentStatus: enums_1.PaymentStatus.Initailized,
                paymentMethod: enums_1.PaymentMethod.UPI
            }
        });
        const response = yield db_1.prismaClient.response.create({
            data: {
                paymentId: payment.id,
                userId: payment.userId,
                responseStatus: enums_1.ResponseStatus.RISED
            }
        });
        res.json({
            message: "Payment & Response created successfully",
            payment: payment,
            response: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
exports.paymentRouter = router;
