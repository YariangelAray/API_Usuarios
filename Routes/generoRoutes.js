import express from "express";
import GeneroController from "../Controllers/GeneroController.js";
import { validarGenero } from "../Middlewares/validarGenero.js";

const router = express.Router();

router.get('/', GeneroController.getAllGeneros);

router.get('/:id' , GeneroController.getGeneroById);

router.post('/', validarGenero, GeneroController.createGenero);

router.put('/:id', validarGenero, GeneroController.updateGenero);

router.patch('/:id', GeneroController.patchGenero);

router.delete('/:id', GeneroController.deleteGenero);

export default router;