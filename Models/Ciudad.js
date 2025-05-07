import connection from "../Utils/db.js";

class Ciudad{

    async getById(id) {
        try {
            
            const [ciudad] = await connection.query("SELECT * FROM ciudades WHERE id = ?", [id]);
            if (ciudad.length === 0) throw new Error("Categoría no encontrada.");
            return ciudad[0];

        } catch (error) {
            throw new Error(error.message || "Error al obtener la ciudad.");
        }
    }

    async create(nombre){

    }

    async update(id, nombre){

    }

    async patch(id, nombre){

    }

    async delete(id){

    }
}

export default Ciudad;