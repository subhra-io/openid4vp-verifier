import { getQRCodePayload } from '../utils/qrCodeGenerator.js';
import QRCode from 'qrcode';

export async function generateQr(req, res) {
  try {
    const payloadData = getQRCodePayload();

    const qrImage = await QRCode.toDataURL(payloadData.Payload);

    res.json({
      ...payloadData,
      QRImage: qrImage
    });
  } catch (error) {
    console.error('QR generation error:', error);
    res.status(500).json({ error: 'Failed to generate QR payload and image' });
  }
}
