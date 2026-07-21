import { Router } from "express";
import { verificarImagen } from "../controllers/verificarController.js";


const router = Router();

router.post('/verificar', verificarImagen);


export default router;