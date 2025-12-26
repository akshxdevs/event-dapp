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
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("../types");
const db_1 = require("../db/db");
const router = express_1.default.Router();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = types_1.eventSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Invalid Input", error: body.error.message });
        }
        ;
        const event = yield db_1.prismaClient.event.create({
            data: body.data
        });
        if (!event) {
            return res.status(402).json({ error: "Event not created or exist" });
        }
        res.json({
            message: "Event created successfully!",
            event: event
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(403).send({ error: "Error: Something went wrong!" });
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield db_1.prismaClient.event.findMany({});
        if (events) {
            return res.json({
                message: "All events Fetched successfully!",
                events: events
            });
        }
        res.json({
            events: []
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(403).send({ error: "Error: Something went wrong!" });
    }
}));
router.get("/get/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const event = yield db_1.prismaClient.event.findUnique({
            where: {
                id: eventId,
            }
        });
        if (!event) {
            return res.status(402).json({ error: "Event not created or exist" });
        }
        res.json({
            message: `event ${event.eventName} fetched successfully`,
            event: event
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(403).send({ error: "Error: Something went wrong!" });
    }
}));
router.post("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const updatingOne = req.body.detail;
        switch (updatingOne) {
            case "date":
                try {
                    const event = yield db_1.prismaClient.event.update({
                        where: {
                            id: eventId,
                        },
                        data: {
                            eventDate: req.body.data,
                        }
                    });
                    res.json({
                        message: `user: ${event.eventName} date update successfully`,
                    });
                }
                catch (error) {
                    return res.status(402).json({ error: "User not created or exist" });
                }
                ;
                break;
            case "":
                break;
        }
        ;
    }
    catch (error) {
        console.error(error.message);
        res.status(403).send({ error: "Error: Something went wrong!" });
    }
}));
exports.eventRouter = router;
