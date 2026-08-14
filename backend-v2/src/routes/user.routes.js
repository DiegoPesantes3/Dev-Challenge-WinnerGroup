import { Router } from "express";
import { deleteUser, getAllUsers, getUsersById } from "../controllers/user.controller.js";
import { requireAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", verifyToken, requireAdmin, getAllUsers)
router.get("/:id", verifyToken, requireAdmin, getUsersById)

router.delete("/:id", verifyToken, requireAdmin, deleteUser)


export default router