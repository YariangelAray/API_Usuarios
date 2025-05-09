import connection from "../Utils/db.js";

class Genero{

    async getById(id) {
        const [genero] = await connection.query("SELECT * FROM generos WHERE id = ?", [id]);
        return genero[0];
    }

    async create(nombre){
        const [result] = await connection.query("INSERT INTO generos(nombre) VALUE ( ? )", [nombre]);              
        return { id: result.insertId, nombre };
    }

    async update(id, nombre){
        await connection.query("UPDATE generos SET nombre = ? WHERE id = ?", [nombre, id]);         
        return { id, nombre };
    }

    async patch(id, sentencia){
        await connection.query(`UPDATE generos SET ${sentencia} WHERE id = ?`, [id]);
    }

    async delete(id){
        await connection.query("DELETE FROM generos WHERE id = ?", [id]);      
    }
}

export default Genero;