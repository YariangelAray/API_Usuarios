import connection from "../Utils/db.js";


class LenguajeUsuario {

    // Método para obtener los usuarios relacionaos a un lenguaje por su ID
    async geUsuariosByIdLenguaje(idLenguaje) {
        const [usuarios] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_lenguaje = ?", [idLenguaje]);        
        return usuarios;
    }

    // Método para obtener los lenguajes de un usuario por su ID
    async getLenguajesByIdUsuario(idUsuario) {
        try {
            const [lenguajes] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_usuario = ?", [idUsuario]);     

            if (lenguajes.length === 0) throw new Error("Usuario no encontrado.");   

            return lenguajes;

        } catch (error) {
            throw new Error(error.message || "Error al obtener los lenguajes del usuario.");            
        }
    }

    // Método para crear un lenguaje relacionado a un usuario
    async create(idUsuario, idLenguaje) {
        try {
            const [result] = await connection.query("INSERT INTO lenguajes_usuarios(id_usuario, id_lenguaje) VALUE (?, ?)", [idUsuario, idLenguaje]);            

            return { id: result.insertId, idUsuario, idLenguaje };

        } catch (error) {
            throw new Error(error.message || "Error al crear el lenguaje del usuario.");
        }
    }

    async update(id, idUsuario, idLenguaje) {
        try {
            const [result] = await connection.query("UPDATE lenguajes_usuarios SET id_usuario = ?, id_lenguaje = ? WHERE id = ?", [idUsuario, idLenguaje, id]);            

            if (result.affectedRows === 0) throw new Error("Lenguaje de usuario no encontrado");

            return { id, idUsuario, idLenguaje };

        } catch (error) {
            throw new Error(error.message || "Error al actualizar el lenguaje del usuario.");
        }
    }

    async patch(id, propiedades) {
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
            
            const [result] = await connection.query(`UPDATE lenguajes_usuarios SET ${sentencia} WHERE id = ?`, [id]);
      
            // Si no se actualizó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Lenguaje de usuario no encontrado");
      
        } catch (error) {
            throw new Error (error.message || "Error al actualizar el lenguaje del usuario.");          
        }
    }

    async delete(id) {
        try {
            const [result] = await connection.query("DELETE FROM lenguajes_usuarios WHERE id = ?", [id]);            

            if (result.affectedRows === 0) throw new Error("Lenguaje de usuario no encontrado.");

            return;

        } catch (error) {
            throw new Error(error.message || "Error al eliminar el lenguaje del usuario.");
        }
    }

    // Método para eliminar los lenguajes relacionados a un usuario por su ID
    async deleteLenguajesUsuario(idUsuario){
        try {
            const [result] = await connection.query("DELETE FROM lenguajes_usuarios WHERE id_usuario = ?", [idUsuario]);

            if (result.affectedRows === 0) throw new Error("Usuario no encontrado.");

            return;

        } catch (error) {
            throw new Error(error.message || "Error al eliminar los lenguajes del usuario.");
        }
    }
}

export default LenguajeUsuario;