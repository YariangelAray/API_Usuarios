import express from "express";
import CiudadController from "../Controllers/CiudadController.js";
import { validarCiudad } from "../Middlewares/validarCiudad.js";

const router = express.Router();

router.get('/:id' , CiudadController.getCiudadById);

router.post('/', validarCiudad, CiudadController.createCiudad);

router.put('/:id', validarCiudad, CiudadController.updateCiudad);

router.patch('/:id', CiudadController.patchCiudad);

router.delete('/:id', CiudadController.deleteCiudad);

export default router;