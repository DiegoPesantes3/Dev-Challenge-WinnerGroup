import { Router } from "express";
import { getDashboardStats } from "../controllers/stats.controller.js";
import { requireAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, requireAdmin, getDashboardStats);

export default router;
