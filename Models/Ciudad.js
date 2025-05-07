import connection from "../Utils/db.js";

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

    async patch(id, nombre){

    }

    async delete(id){

    }
}

export default Ciudad;