import express from "express";
import {
    createAITrustCentreOverview,
    getAITrustCentreOverview,
} from "../controllers/aiTrustCentre.ctrl";
import authenticateJWT from "../middleware/auth.middleware";

const router = express.Router();

router.get("/overview", getAITrustCentreOverview);
router.post("/overview", authenticateJWT, createAITrustCentreOverview);

export default router;