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
exports.ticketRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const enums_1 = require("../generated/prisma/enums");
const router = express_1.default.Router();
router.post("/generate/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const payment = yield db_1.prismaClient.payment.findUnique({
            where: {
                id: req.body.payment
            }
        });
        if ((payment === null || payment === void 0 ? void 0 : payment.paymentStatus) === enums_1.PaymentStatus.Paid) {
        }
    }
    catch (error) {
    }
}));
exports.ticketRouter = router;
