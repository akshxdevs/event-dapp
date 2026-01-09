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
exports.generateBookingQRCode = generateBookingQRCode;
const qrcode_1 = __importDefault(require("qrcode"));
const db_1 = require("../db/db");
/**
 * Generates a QR code as a Base64 Data URL.
 * In a real app, 'data' would be your Booking ID or a signed JWT.
 */
function generateBookingQRCode(bookingId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate the QR code as a string (Data URL)
            const qrCodeDataUrl = yield qrcode_1.default.toDataURL(bookingId, {
                errorCorrectionLevel: 'H', // High error correction (useful for printed/scanned tickets)
                margin: 2,
                color: {
                    dark: '#000000', // Black dots
                    light: '#FFFFFF', // White background
                },
            });
            yield db_1.prismaClient.booking.update({
                where: {
                    id: bookingId,
                },
                data: {
                    qrcode: qrCodeDataUrl
                }
            });
            return qrCodeDataUrl;
        }
        catch (err) {
            console.error('Error generating QR code:', err);
            throw new Error('Failed to generate QR code');
        }
    });
}
