import connection from "../Utils/db.js";
import LenguajeUsuario from "./LenguajeUsuario.js";

class Lenguaje{

    async getById(id) {
        try {

            const [lenguaje] = await connection.query("SELECT * FROM lenguajes WHERE id = ?", [id]);
            if (lenguaje.length === 0) throw new Error("Lenguaje no encontrado.");
            return lenguaje[0];

        } catch (error) {
            throw new Error(error.message || "Error al obtener el lenguaje.");
        }
    }

    async create(nombre){
        try {      

            const [result] = await connection.query("INSERT INTO lenguajes(nombre) VALUE ( ? )", [nombre]);              
            return { id: result.insertId, nombre };
      
        } catch (error) {
            throw new Error("Error al crear el lenguaje.");
        }
    }

    async update(id, nombre){
        try {
      
            const [result] = await connection.query("UPDATE lenguajes SET nombre = ? WHERE id = ?", [nombre, id]);
                  
            if (result.affectedRows === 0) throw new Error("Lenguaje no encontrado.");
                  
            return { id, nombre };
      
        } catch (error) {
            throw new Error( error.message || "Error al actualizar el lenguaje.");
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
            
            const [result] = await connection.query(`UPDATE lenguajes SET ${sentencia} WHERE id = ?`, [id]);
      
            // Si no se actualizó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Lenguaje no encontrado.");
      
        } catch (error) {
            throw new Error (error.message || "Error al actualizar el lenguaje.");          
        }
    }

    async delete(id){
        try {

            const objUsuariosLeng = new LenguajeUsuario();
      
            // Verificamos si el lenguaje tiene usuarios relacionados
            const usuarios = await objUsuariosLeng.geUsuariosByIdLenguaje(id);
      
            // Si tiene el resultado es true, lanzamos un error
            if (usuarios.length > 0){
              throw new Error("No se puede eliminar el lenguaje porque tiene usuarios relacionados.");
            }
            
            const [result] = await connection.query("DELETE FROM lenguajes where id=?", [id]);      
            
            // Si no se eliminó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Lenguaje no encontrado.");    
      
            return;
      
          } catch (error) {    
            throw new Error(error.message || "Error al eliminar el lenguaje.");
          }
    }

}

export default Lenguaje;