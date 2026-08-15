import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { analyzeNews, deleteAnalysis, getAnalysisById, getUserHistory } from "../controllers/analysis.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getUserHistory)
router.get("/:id", verifyToken, getAnalysisById)
router.delete("/:id", verifyToken, deleteAnalysis)
router.post("/analyze", verifyToken, upload.single("imageFile"), analyzeNews);

export default router;