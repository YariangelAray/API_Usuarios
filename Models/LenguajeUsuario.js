import connection from "../Utils/db.js";

class LenguajeUsuario {

    // Obtener un registro de lenguajes_usuarios por su id (PK)
    async getById(id) {
      const [lenguajeUsuario] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id = ?", [id]);
      return lenguajeUsuario[0];
    }
  
    // Obtener todos los registros de lenguajes relacionados a un usuario
    async getLenguajesByIdUsuario(idUsuario) {
      const [lenguajes] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_usuario = ?", [idUsuario]);
      return lenguajes;
    }
  
    // Obtener todos los registros de usuario relacionados a un lenguaje
    async geUsuariosByIdLenguaje(idLenguaje) {
      const [usuarios] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_lenguaje = ?", [idLenguaje]);
      return usuarios;
    }
  
    // Crear nueva relación lenguaje-usuario
    async create(idUsuario, idLenguaje) {
      const [result] = await connection.query("INSERT INTO lenguajes_usuarios (id_usuario, id_lenguaje) VALUES (?, ?)",[idUsuario, idLenguaje]);
      return { id: result.insertId, idUsuario, idLenguaje };
    }
  
    async update(id, idUsuario, idLenguaje) {
        await connection.query("UPDATE lenguajes_usuarios SET id_usuario = ?, id_lenguaje = ? WHERE id = ?", [idUsuario, idLenguaje, id]);
      return { id, idUsuario, idLenguaje };
    }
  
    async patch(id, sentencia) {
      await connection.query(`UPDATE lenguajes_usuarios SET ${sentencia} WHERE id = ?`, [id]);
    }
  
    // Eliminar relación lenguaje-usuario
    async delete(id) {
      await connection.query("DELETE FROM lenguajes_usuarios WHERE id = ?",[id]);
    }
  
    // Eliminar todos los lenguajes de un usuario
    async deleteLenguajesByIdUsuario(idUsuario) {
      await connection.query("DELETE FROM lenguajes_usuarios WHERE id_usuario = ?", [idUsuario]);
    }
  }
  
  export default LenguajeUsuario;
  