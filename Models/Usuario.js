import connection from "../Utils/db.js";
import LenguajeUsuario from "./LenguajeUsuario.js";

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
        try {

            const [usuario] = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
            
            if (usuario.length === 0) throw new Error("Usuario no encontrado.");
            const objLenguajesUsuario = new LenguajeUsuario();
            const lenguajes = await objLenguajesUsuario.getLenguajesByIdUsuario(id);
            usuario[0].lenguajes = lenguajes;

            return usuario[0];

        } catch (error) {
            throw new Error(error.message || "Error al obtener el usuario.");
        }
    }

    async create(nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena){
        try {      

            const [result] = await connection.query("INSERT INTO usuarios(nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena) VALUE ( ?, ?, ?, ?, ?, ?, ?, ? )", [nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena]);              
            return { id: result.insertId, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena };
      
        } catch (error) {
            throw new Error("Error al crear el usuario.");
        }
    }

    async update(id, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena){
        try {
      
            const [result] = await connection.query("UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ?, id_ciudad = ?, id_genero = ?, no_documento = ?, usuario = ?, contrasena = ? WHERE id = ?", [nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena, id]);
                  
            if (result.affectedRows === 0) throw new Error("Usuario no encontrado.");
                  
            return { id, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena };
      
        } catch (error) {
            throw new Error( error.message || "Error al actualizar el usuario.");
        }
    }

    async patch(id, propiedades){
        try {

            if (!propiedades) {
              throw new Error("No se han enviado propiedades para actualizar.");        
            }
      
            let sentencia = "";
            // Recorremos las propiedades y creamos la sentencia SQL
            for (const key in propiedades) {        
              sentencia += `${key} = "${propiedades[key]}", `;
            }            
            // Eliminamos la última coma y espacio 
            sentencia = sentencia.slice(0, -2);   
            
            const [result] = await connection.query(`UPDATE usuarios SET ${sentencia} WHERE id = ?`, [id]);
      
            // Si no se actualizó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Usuario no encontrado.");
      
        } catch (error) {
            throw new Error (error.message || "Error al actualizar el usuario.");          
        }
    }

    async delete(id) {
        try {
            
            const objLenguajesUsuario = new LenguajeUsuario();
            await objLenguajesUsuario.deleteLenguajesUsuario(id);

            const [result] = await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
            
            if (result.affectedRows === 0) throw new Error("Usuario no encontrado.");
            
            return;

        } catch (error) {
            throw new Error(error.message || "Error al eliminar el usuario.");
        }
    }
}

export default Usuario;