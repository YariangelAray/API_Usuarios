import express from "express";
import CiudadController from "../Controllers/CiudadController.js";

const router = express.Router();

router.get('/:id' , CiudadController.getCiudadById);

router.post('/', CiudadController.createCiudad);

router.put('/:id', CiudadController.updateCiudad);

router.patch('/:id', CiudadController.patchCiudad);

router.delete('/:id', CiudadController.deleteCiudad);

export default router;