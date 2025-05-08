import connection from "../Utils/db.js";


class LenguajeUsuario {

    async geUsuariostByIdLenguaje(idLenguaje) {
        const [usuarios] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_lenguaje = ?", [idLenguaje]);        
        return usuarios;
    }
    async getLenguajesByIdUsuario(idUsuario) {
        const [lenguajes] = await connection.query("SELECT * FROM lenguajes_usuarios WHERE id_usuario = ?", [idUsuario]);        
        return lenguajes;
    }

    async deleteLenguajesUsuario(idUsuario){
        try {
            const [result] = await connection.query("DELETE FROM lenguajes_usuarios WHERE id_usuario = ?", [idUsuario]);

            if (result.affectedRows === 0) throw new Error("Usuario no encontrado.");

            return;

        } catch (error) {
            throw new Error(error.message || "Error al eliminar los lenguajes del usuario.");
        }
    }
}

export default LenguajeUsuario;