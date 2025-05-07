import connection from "../Utils/db.js";

class Usuario{

    async getByIdCiudad(idCiudad) {
        const [usuarios] = await connection.query("SELECT * FROM usuarios WHERE id_ciudad = ?", [idCiudad]);  
        return usuarios;
    }

    async getByIdGenero(idGenero) {
        const [usuarios] = await connection.query("SELECT * FROM usuarios WHERE id_genero = ?", [idGenero]);        
        return usuarios;
    }
}

export default Usuario;