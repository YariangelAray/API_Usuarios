import express from "express";
import LenguajeController from "../Controllers/LenguajeController.js";

const router = express.Router();

router.get('/:id' , LenguajeController.getLenguajeById);

router.post('/', LenguajeController.createLenguaje);

router.put('/:id', LenguajeController.updateLenguaje);

router.patch('/:id', LenguajeController.patchLenguaje);

router.delete('/:id', LenguajeController.deleteLenguaje);

export default router;