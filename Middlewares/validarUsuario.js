export const validarUsuario = (req, res, next) => {
    const camposEsperados = [
        "nombre", "apellido", "telefono",
        "id_ciudad", "id_genero",
        "no_documento", "usuario", "contrasena"
      ];
    
      for (const campo of camposEsperados) {
        if (!req.body[campo] || String(req.body[campo]).trim() === "") {
          return res.status(400).json({ mensaje: `El campo ${campo} es obligatorio` });
        }
      }

  next();
}