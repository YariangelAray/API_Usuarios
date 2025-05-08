import express from "express";
import UsuarioController from "../Controllers/UsuarioController.js";

const router = express.Router();

router.get('/:id' , UsuarioController.getUsuarioById);

router.post('/', UsuarioController.createUsuario);

router.put('/:id', UsuarioController.updateUsuario);

router.patch('/:id', UsuarioController.patchUsuario);

router.delete('/:id', UsuarioController.deleteUsuario);

export default router;