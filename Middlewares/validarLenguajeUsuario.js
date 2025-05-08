export const validarLenguajeUsuario = (req, res, next) => {
    const { id_usuario, id_lenguaje } = req.body;

  if (id_usuario.trim() === "" || !id_usuario) {
    return res.status(400).json({ mensaje: "El id del usuario es obligatorio" });
  }

  if (id_lenguaje.trim() === "" || !id_lenguaje) {
    return res.status(400).json({ mensaje: "El id del lenguaje es obligatorio" });
  }
  next();
}