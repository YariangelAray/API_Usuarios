import connection from "../Utils/db.js";
import Usuario from "./Usuario.js";

class Genero{

    async getById(id) {
        try {

            const [genero] = await connection.query("SELECT * FROM generos WHERE id = ?", [id]);
            if (genero.length === 0) throw new Error("Genero no encontrado.");
            return genero[0];

        } catch (error) {
            throw new Error(error.message || "Error al obtener el genero.");
        }
    }

    async create(nombre){
        try {      

            const [result] = await connection.query("INSERT INTO generos(nombre) VALUE ( ? )", [nombre]);              
            return { id: result.insertId, nombre };
      
        } catch (error) {
            throw new Error("Error al crear el genero.");
        }
    }

    async update(id, nombre){
        try {
      
            const [result] = await connection.query("UPDATE generos SET nombre = ? WHERE id = ?", [nombre, id]);
                  
            if (result.affectedRows === 0) throw new Error("Genero no encontrado.");
                  
            return { id, nombre };
      
        } catch (error) {
            throw new Error( error.message || "Error al actualizar el genero.");
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
            
            const [result] = await connection.query(`UPDATE generos SET ${sentencia} WHERE id = ?`, [id]);
      
            // Si no se actualizó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Genero no encontrado.");
      
        } catch (error) {
            throw new Error (error.message || "Error al actualizar el genero.");          
        }
    }

    async delete(id){
        try {

            const objUsuario = new Usuario();
      
            // Verificamos si el genero tiene usuarios relacionados
            const usuarios = await objUsuario.getByIdGenero(id);
      
            // Si tiene el resultado es true, lanzamos un error
            if (usuarios.length > 0){
              throw new Error("No se puede eliminar el genero porque tiene usuarios relacionados.");
            }
            
            const [result] = await connection.query("DELETE FROM generos where id=?", [id]);      
            
            // Si no se eliminó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Genero no encontrado.");    
      
            return;
      
          } catch (error) {    
            throw new Error(error.message || "Error al eliminar el genero.");
          }
    }
}

export default Genero;