import express from 'express';
import { generateQr } from '../controllers/qrController.js';

const router = express.Router();

router.get('/generate', generateQr);

export default router;
