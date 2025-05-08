import LenguajeUsuario from "../Models/LenguajeUsuario.js";

class LenguajeUsuarioController{

    static async getLenguajesUsuarioById(req, res) {
        try {
            const { id } = req.params;      

            const objLenguajeUsuario = new LenguajeUsuario();
            const lenguajes = await objLenguajeUsuario.getLenguajesByIdUsuario(id);    

            res.json({ mensaje: "Lenguajes del usuario", lenguajes});          
        } catch (error) {
            res.status(500).json({error: error.message});
        }      
    }

    static async createLenguajeUsuario(req, res) {
        try {
            const { id_usuario, id_lenguaje } = req.body;      

            const objLenguajeUsuario = new LenguajeUsuario();
            const lenguajeUsuarioCreado = await objLenguajeUsuario.create(id_usuario, id_lenguaje);    

            res.status(201).json({mensaje: "Lenguaje de usuario creado con éxito", lenguajeUsuarioCreado});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateLenguajeUsuario(req, res) {
        try {
            const { id } = req.params;
            const { id_usuario, id_lenguaje } = req.body;          
        
            const objLenguajeUsuario = new LenguajeUsuario();
            const lenguajeUsuarioActualizado = await objLenguajeUsuario.update(id, id_usuario, id_lenguaje);            
        
            res.status(201).json({mensaje: "Lenguaje de usuario actualizado con éxito", lenguajeUsuarioActualizado});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchLenguajeUsuario(req, res) {
        try {
            const { id } = req.params;        
            const propiedades = req.body;        
            
            const objLenguajeUsuario = new LenguajeUsuario();            
            await objLenguajeUsuario.patch(id, propiedades);        
            
            res.status(201).json({ mensaje: "Lenguaje de usuario actualizado" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }  
    }

    static async deleteLenguajeUsuario(req, res) {
        try {
            const { id } = req.params;        
            
            const objLenguajeUsuario = new LenguajeUsuario();            
            await objLenguajeUsuario.delete(id);        
            
            res.status(201).json({ mensaje: "Lenguaje de usuario eliminado" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }  
    }
}

export default LenguajeUsuarioController;