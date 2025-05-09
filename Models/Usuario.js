import connection from "../Utils/db.js";

class Usuario{

    async getByIdCiudad(idCiudad) {
        const [usuarios] = await connection.query("SELECT * FROM usuarios WHERE id_ciudad = ?", [idCiudad]);
        return usuarios;
    }

    async getByIdGenero(idGenero) {
        const [usuarios] = await connection.query("SELECT * FROM usuarios WHERE id_genero = ?", [idGenero]);        
        return usuarios;
    }

    async getById(id) {
        const [usuario] = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        return usuario[0];
    }
          
    async create(nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena) {
        const [result] = await connection.query("INSERT INTO usuarios (nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena]);

        return { id: result.insertId };
    }
    
    async update(id, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena) {
        await connection.query("UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ?, id_ciudad = ?, id_genero = ?, no_documento = ?, usuario = ?, contrasena = ? WHERE id = ?", [nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena, id]);        
    }

    async patch(id, sentencia) {
        await connection.query(`UPDATE usuarios SET ${sentencia} WHERE id = ?`, [id]);
    }
    
    async delete(id) {
        await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
    }
}

export default Usuario;