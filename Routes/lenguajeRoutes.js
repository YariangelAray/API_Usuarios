import express from "express";
import LenguajeController from "../Controllers/LenguajeController.js";
import { validarLenguaje } from "../Middlewares/validarLenguaje.js";
const router = express.Router();

router.get('/:id' , LenguajeController.getLenguajeById);

router.post('/', validarLenguaje, LenguajeController.createLenguaje);

router.put('/:id', validarLenguaje, LenguajeController.updateLenguaje);

router.patch('/:id', LenguajeController.patchLenguaje);

router.delete('/:id', LenguajeController.deleteLenguaje);

export default router;