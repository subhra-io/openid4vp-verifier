// src/utils/jwtUtils.js
import jwt from "jsonwebtoken";
import { privateKey } from "../config/key";

// Utility to generate JWT token
export const generateJwt = (payload) => {
  return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "1h" });
};

// Utility to verify JWT token
export const verifyJwt = (token, publicKey) => {
  try {
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  } catch (error) {
    throw new Error("JWT Verification Failed");
  }
};
