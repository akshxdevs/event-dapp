import QRCode from 'qrcode';
import { prismaClient } from '../db/db';

/**
 * Generates a QR code as a Base64 Data URL.
 * In a real app, 'data' would be your Booking ID or a signed JWT.
 */
export async function generateBookingQRCode(bookingId: string): Promise<string> {
  try {
    // Generate the QR code as a string (Data URL)
    const qrCodeDataUrl = await QRCode.toDataURL(bookingId, {
      errorCorrectionLevel: 'H', // High error correction (useful for printed/scanned tickets)
      margin: 2,
      color: {
        dark: '#000000', // Black dots
        light: '#FFFFFF', // White background
      },
    });
    
    await prismaClient.booking.update({
        where:{
            id:bookingId,
        },
        data:{
            qrcode:qrCodeDataUrl
        }
    });
    return qrCodeDataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw new Error('Failed to generate QR code');
  }
}