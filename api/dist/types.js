"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(8).max(32)
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(8).max(32)
});
exports.eventSchema = zod_1.default.object({
    eventName: zod_1.default.string().max(50).min(8),
    eventDetails: zod_1.default.string().max(200).min(10),
    eventImg: zod_1.default.string().trim(),
    eventHostedBy: zod_1.default.string(),
    eventPrice: zod_1.default.int(),
    eventTags: zod_1.default.string(),
    eventDate: zod_1.default.date(),
});
