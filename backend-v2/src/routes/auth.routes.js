import { Router } from "express"
import { register, login } from "../controllers/auth.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user })
})


export default router;
