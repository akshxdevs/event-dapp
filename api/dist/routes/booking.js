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
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const router = express_1.default.Router();
router.get("/book/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const booking = yield db_1.prismaClient.booking.findFirst({
            where: {
                userId: userId,
                eventId: req.body.eventId
            }
        });
        if (!booking) {
            return res.status(402).json({ message: "Not Found!" });
        }
        res.json({
            message: "Fetched Sucessfully",
            booking: booking,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
router.post("/book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const booking = yield db_1.prismaClient.booking.create({
            data: {
                eventId: eventId,
                userId: req.body.userId,
            }
        });
        res.status(200).json({
            message: "Booking successfull",
            booking_details: booking
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
exports.bookingRouter = router;
