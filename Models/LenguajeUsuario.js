import connection from "../Utils/db.js";

class LenguajeUsuario {

  async getById(id) {
    const [lenguajeUsuario] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id = ?", [id]);
    return lenguajeUsuario[0];
  }

  // Obtener todos los registros de lenguajes relacionados a un usuario
  async getLenguajesByIdUsuario(id_usuario) {
    const [lenguajes] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_usuario = ?", [id_usuario]);
    return lenguajes;
  }

  // Obtener todos los registros de usuario relacionados a un lenguaje
  async geUsuariosByIdLenguaje(id_lenguaje) {
    const [usuarios] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_lenguaje = ?", [id_lenguaje]);
    return usuarios;
  }

  // Crear nueva relación lenguaje-usuario
  async create(id_usuario, id_lenguaje) {
    const [result] = await connection.query("INSERT INTO lenguajes_usuarios (id_usuario, id_lenguaje) VALUES (?, ?)",[id_usuario, id_lenguaje]);
    return { id: result.insertId, id_usuario, id_lenguaje };
  }

  async update(id, id_usuario, id_lenguaje) {
    await connection.query("UPDATE lenguajes_usuarios SET id_usuario = ?, id_lenguaje = ? WHERE id = ?", [id_usuario, id_lenguaje, id]);
    return { id, id_usuario, id_lenguaje };
  }

  async patch(id, sentencia) {
    await connection.query(`UPDATE lenguajes_usuarios SET ${sentencia} WHERE id = ?`, [id]);
  }

  // Eliminar relación lenguaje-usuario
  async delete(id) {
    await connection.query("DELETE FROM lenguajes_usuarios WHERE id = ?",[id]);
  }

  // Eliminar todos los lenguajes de un usuario
  async deleteLenguajesByIdUsuario(id_usuario) {
    await connection.query("DELETE FROM lenguajes_usuarios WHERE id_usuario = ?", [id_usuario]);
  }
}
  
export default LenguajeUsuario;
  