import express from "express";
import UsuarioController from "../Controllers/UsuarioController.js";
import { validarUsuario } from "../Middlewares/validarUsuario.js";


const router = express.Router();

router.get('/:id' , UsuarioController.getUsuarioById);

router.post('/', validarUsuario, UsuarioController.createUsuario);

router.put('/:id', validarUsuario, UsuarioController.updateUsuario);

router.patch('/:id', UsuarioController.patchUsuario);

router.delete('/:id', UsuarioController.deleteUsuario);

export default router;