import express from "express";
import LenguajeUsuarioController from "../Controllers/LenguajeUsuarioController.js";
import { validarLenguajeUsuario } from "../Middlewares/validarLenguajeUsuario.js";

const router = express.Router();

router.get('/:id' , LenguajeUsuarioController.getLenguajesUsuarioById);

router.post('/', validarLenguajeUsuario, LenguajeUsuarioController.createLenguajeUsuario);

router.put('/:id', validarLenguajeUsuario, LenguajeUsuarioController.updateLenguajeUsuario);

router.patch('/:id', LenguajeUsuarioController.patchLenguajeUsuario);

router.delete('/:id', LenguajeUsuarioController.deleteLenguajeUsuario);

export default router;