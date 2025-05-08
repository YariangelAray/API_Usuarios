import express from "express";
import LenguajeUsuarioController from "../Controllers/LenguajeUsuarioController.js";

const router = express.Router();

router.get('/:id' , LenguajeUsuarioController.getLenguajesUsuarioById);

router.post('/', LenguajeUsuarioController.createLenguajeUsuario);

router.put('/:id', LenguajeUsuarioController.updateLenguajeUsuario);

router.patch('/:id', LenguajeUsuarioController.patchLenguajeUsuario);

router.delete('/:id', LenguajeUsuarioController.deleteLenguajeUsuario);

export default router;