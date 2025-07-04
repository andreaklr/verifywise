import express from "express";
import {
    createAITrustCentreOverview,
} from "../controllers/aiTrustCentre.ctrl";
import authenticateJWT from "../middleware/auth.middleware";

const router = express.Router();

router.post("/overview", authenticateJWT, createAITrustCentreOverview);

export default router;