import express from 'express';
import { generateAuthRequest } from '../utils/generateAuthRequest.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { selectedFields } = req.body;

  if (!Array.isArray(selectedFields)) {
    return res.status(400).json({ error: "selectedFields must be an array" });
  }

  try {
    const jwtToken = generateAuthRequest(selectedFields);
    return res.status(200).json({ jwt: jwtToken });
  } catch (error) {
    console.error("JWT Generation Error:", error);
    return res.status(500).json({ error: "Failed to generate JWT" });
  }
});
export default router;

