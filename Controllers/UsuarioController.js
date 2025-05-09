import UsuarioService from "../Services/UsuarioService.js";

class UsuarioController{

    static async getUsuarioById(req, res) 
    {
        try {
            const { id } = req.params;      
            const usuarioService = new UsuarioService();
            const usuario = await usuarioService.getById(id);    
            res.json(usuario);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createUsuario(req, res) 
    {
        try {
            const { nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena } = req.body;        
            const usuarioService = new UsuarioService();
            const usuarioCreado = await usuarioService.create(nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena);
            
            res.status(201).json({mensaje: "Usuario creado con éxito.", usuarioCreado});
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateUsuario(req, res) 
    {
        try {
            const { id } = req.params;
            const { nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena } = req.body;          
        
            const usuarioService = new UsuarioService();
            const usuarioActualizado = await usuarioService.update(id, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena);
            
            res.status(201).json({mensaje: "Usuario actualizado con éxito.", usuarioActualizado});
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchUsuario(req, res) 
    {
        try {
            const { id } = req.params;      
            const propiedades = req.body;        
            const usuarioService = new UsuarioService();             
            const usuarioActualizado = await usuarioService.patch(id, propiedades);
      
            res.status(201).json({ mensaje: "Usuario actualizado con éxito.", usuarioActualizado });
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }  
    }

    static async deleteUsuario(req, res) 
    {
        try {
            const { id } = req.params;      
            const usuarioService = new UsuarioService();
            const usuario = await usuarioService.delete(id);      
            
            res.status(201).json({ mensaje: "Usuario eliminado con éxito.", usuario });
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UsuarioController;