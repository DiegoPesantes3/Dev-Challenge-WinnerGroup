import { Router } from "express";
import multer from "multer";
import { verificarImagen } from "../controllers/verificarController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/verificar', upload.single('image'), verificarImagen);

export default router;
