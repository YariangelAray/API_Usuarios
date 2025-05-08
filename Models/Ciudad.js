import connection from "../Utils/db.js";

class Ciudad{

    async getById(id) {
        const [ciudad] = await connection.query("SELECT * FROM ciudades WHERE id = ?", [id]);
        return ciudad;
    }

    async create(nombre){
        const [result] = await connection.query("INSERT INTO ciudades(nombre) VALUE ( ? )", [nombre]);              
        return { id: result.insertId, nombre };
    }

    async update(id, nombre){
        await connection.query("UPDATE ciudades SET nombre = ? WHERE id = ?", [nombre, id]);         
        return { id, nombre };
    }

    async patch(id, sentencia){
        await connection.query(`UPDATE ciudades SET ${sentencia} WHERE id = ?`, [id]);
    }

    async delete(id){
        await connection.query("DELETE FROM ciudades WHERE id = ?", [id]);      
    }
}

export default Ciudad;