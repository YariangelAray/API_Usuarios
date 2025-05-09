import LenguajeUsuarioService from "../Services/LenguajeUsuarioService.js";

class LenguajeUsuarioController{

    static async getLenguajesUsuarioById(req, res) {
        try {
            const { id } = req.params;      

            const lenguajeUsuarioService = new LenguajeUsuarioService();
            const lenguajes = await lenguajeUsuarioService.getLenguajesByIdUsuario(id);    

            res.json({ mensaje: "Lenguajes del usuario", lenguajes});          
        } catch (error) {
            res.status(500).json({error: error.message});
        }      
    }

    static async createLenguajeUsuario(req, res) {
        try {
            const { id_usuario, id_lenguaje } = req.body;      

            const lenguajeUsuarioService = new LenguajeUsuarioService();
            const lenguajeUsuarioCreado = await lenguajeUsuarioService.create(id_usuario, id_lenguaje);    

            res.status(201).json({mensaje: "Relación lenguaje-usuario agregada con éxito.", lenguajeUsuarioCreado});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateLenguajeUsuario(req, res) {
        try {
            const { id } = req.params;
            const { id_usuario, id_lenguaje } = req.body;          
        
            const lenguajeUsuarioService = new LenguajeUsuarioService();
            const lenguajeUsuarioActualizado = await lenguajeUsuarioService.update(id, id_usuario, id_lenguaje);            
        
            res.status(201).json({mensaje: "Relación lenguaje-usuario actualizada con éxito.", lenguajeUsuarioActualizado});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchLenguajeUsuario(req, res) {
        try {
            const { id } = req.params;        
            const propiedades = req.body;        
            
            const lenguajeUsuarioService = new LenguajeUsuarioService();            
            await lenguajeUsuarioService.patch(id, propiedades);        
            
            res.status(201).json({ mensaje: "Relación lenguaje-usuario actualizada con éxito." });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }  
    }

    static async deleteLenguajeUsuario(req, res) {
        try {
            const { id } = req.params;        
            
            const lenguajeUsuarioService = new LenguajeUsuarioService();            
            await lenguajeUsuarioService.delete(id);        
            
            res.status(201).json({ mensaje: "Relación lenguaje-usuario eliminada con éxito." });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }  
    }
}

export default LenguajeUsuarioController;