import connection from "../Utils/db.js";


class LenguajeUsuario {

    async geUsuariostByIdLenguaje(idLenguaje) {
        const [usuarios] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_lenguaje = ?", [idLenguaje]);        
        return usuarios;
    }
}

export default LenguajeUsuario;