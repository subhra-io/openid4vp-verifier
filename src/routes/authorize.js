import express from 'express';
import { generateAuthRequest } from '../utils/generateAuthRequest.js';

const router = express.Router();

// Define GET handler separately, outside of POST handler
router.get('/', (req, res) => {
  res.send('GET /authorize route is working. Use POST to generate JWT.');
});

// Define POST handler
router.post('/', (req, res) => {
  console.log("Received POST /authorize request with body:", req.body);

  const { selectedFields } = req.body;
  if (!Array.isArray(selectedFields)) {
    console.log("Invalid selectedFields, must be array");
    return res.status(400).json({ error: "selectedFields must be an array" });
  }

  try {
    const jwtToken = generateAuthRequest(selectedFields);
    console.log("Generated JWT:", jwtToken);
    return res.status(200).json({ jwt: jwtToken });
  } catch (error) {
    console.error("JWT Generation Error:", error);
    return res.status(500).json({ error: "Failed to generate JWT" });
  }
});

export default router;
