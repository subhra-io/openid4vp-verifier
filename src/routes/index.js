import express from "express";
import { handleAuthorizationRequest, handleJwtCallback } from "../controllers/jwtController.js";

export const initializeRoutes = (app) => {
  const router = express.Router();

  // Route to handle the JWT authorization request
  router.post("/authorize", handleAuthorizationRequest);

  // Route to handle the JWT callback response
  router.post("/callback", handleJwtCallback);

  app.use("/api", router);
};
