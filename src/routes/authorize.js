// src/routes/authorize.js
import express from 'express';
import { generateAuthRequest } from '../utils/generateAuthRequest.js';

const router = express.Router();

router.get('/', (req, res) => {
  const requestJwt = generateAuthRequest();
  res.json({ request: requestJwt });
});

export default router;
