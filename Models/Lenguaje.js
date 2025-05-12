import connection from "../Utils/db.js";
import LenguajeUsuario from "./LenguajeUsuario.js";

class Lenguaje{

    async getAll(){
        const [lenguajes] = await connection.query("SELECT * FROM lenguajes");
        return lenguajes;
    }

    async getById(id) {
        const [lenguaje] = await connection.query("SELECT * FROM lenguajes WHERE id = ?", [id]);
        return lenguaje[0];
    }

    async create(nombre){
        const [result] = await connection.query("INSERT INTO lenguajes(nombre) VALUE ( ? )", [nombre]);              
        return { id: result.insertId, nombre };
    }

    async update(id, nombre){
        await connection.query("UPDATE lenguajes SET nombre = ? WHERE id = ?", [nombre, id]);         
        return { id, nombre };
    }

    async patch(id, sentencia){
        await connection.query(`UPDATE lenguajes SET ${sentencia} WHERE id = ?`, [id]);
    }

    async delete(id){
        await connection.query("DELETE FROM lenguajes WHERE id = ?", [id]);  
    }

}

export default Lenguaje;