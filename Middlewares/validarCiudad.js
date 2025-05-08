export const validarCiudad = (req, res, next) => {
    const { nombre } = req.body;

  if (nombre.trim() === "" || !nombre) {
    return res.status(400).json({ mensaje: "El nombre en la ciudad es obligatorio" });
  }

  next();
}