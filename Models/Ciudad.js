import connection from "../Utils/db.js";
import Usuario from "./Usuario.js";

class Ciudad{

    async getById(id) {
        try {

            const [ciudad] = await connection.query("SELECT * FROM ciudades WHERE id = ?", [id]);
            if (ciudad.length === 0) throw new Error("Ciudad no encontrada.");
            return ciudad[0];

        } catch (error) {
            throw new Error(error.message || "Error al obtener la ciudad.");
        }
    }

    async create(nombre){
        try {      

            const [result] = await connection.query("INSERT INTO ciudades(nombre) VALUE ( ? )", [nombre]);              
            return { id: result.insertId, nombre };
      
        } catch (error) {
            throw new Error("Error al crear la ciudad.");
        }
    }

    async update(id, nombre){
        try {
      
            const [result] = await connection.query("UPDATE ciudades SET nombre = ? WHERE id = ?", [nombre, id]);
                  
            if (result.affectedRows === 0) throw new Error("Ciudad no encontrada.");
                  
            return { id, nombre };
      
        } catch (error) {
            throw new Error( error.message || "Error al actualizar la ciudad.");
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
            
            const [result] = await connection.query(`UPDATE ciudades SET ${sentencia} WHERE id = ?`, [id]);
      
            // Si no se actualizó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Ciudad no encontrada.");
      
        } catch (error) {
            throw new Error (error.message || "Error al actualizar la ciudad.");          
        }
    }

    async delete(id){
        try {

            const objUsuario = new Usuario();
      
            // Verificamos si la ciudad tiene usuarios relacionados
            const usuarios = await objUsuario.getByIdCiudad(id);
      
            // Si tiene el resultado es true, lanzamos un error
            if (usuarios.length > 0){
              throw new Error("No se puede eliminar la ciudad porque tiene usuarios relacionados.");
            }
            
            const [result] = await connection.query("DELETE FROM ciudades where id=?", [id]);      
            
            // Si no se eliminó ningún registro, lanzamos un error
            if (result.affectedRows === 0) throw new Error("Ciudad no encontrada.");    
      
            return;
      
          } catch (error) {    
            throw new Error(error.message || "Error al eliminar la ciudad.");
          }
    }
}

export default Ciudad;