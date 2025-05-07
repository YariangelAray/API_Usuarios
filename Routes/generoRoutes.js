import express from "express";
import GeneroController from "../Controllers/GeneroController.js";

const router = express.Router();

router.get('/:id' , GeneroController.getGeneroById);

router.post('/', GeneroController.createGenero);

router.put('/:id', GeneroController.updateGenero);

router.patch('/:id', GeneroController.patchGenero);

router.delete('/:id', GeneroController.deleteGenero);

export default router;