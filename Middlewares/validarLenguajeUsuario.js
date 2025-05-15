export const validarLenguajeUsuario = (req, res, next) => {
  const { id_usuario, id_lenguaje } = req.body;

  // if (!id_usuario || id_usuario.trim() === "") {
  //   return res.status(400).json({ mensaje: "El id del usuario es obligatorio" });
  // }

  if (!Number.isInteger(Number(id_usuario))) {
    return res.status(400).json({ mensaje: "El id del usuario no es válido" });
  }

  // if (!id_lenguaje || id_lenguaje.trim() === "") {
  //   return res.status(400).json({ mensaje: "El id del lenguaje es obligatorio" });
  // }

  if (!Number.isInteger(Number(id_lenguaje))) {
    return res.status(400).json({ mensaje: "El id del lenguaje no es válido" });
  }
  
  next();
}