import { Router } from "express";
import { deleteAnalysis, getAnalysisById, getUserHistory } from "../controllers/analysis.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getUserHistory)
router.get("/:id", verifyToken, getAnalysisById)
router.delete("/:id", verifyToken, deleteAnalysis)

export default router;