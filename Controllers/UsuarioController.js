import Usuario from "../Models/Usuario.js";

class UsuarioController{

    static async getUsuarioById(req, res) 
    {
        try {
            const objUsuario = new Usuario();
            const { id } = req.params;      
            const usuario = await objUsuario.getById(id);    
            res.json(usuario);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createUsuario(req, res) 
    {
        try {
            const { nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena } = req.body;        
            const objUsuario = new Usuario();
            const usuarioCreado = await objUsuario.create(nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena);
            
            res.status(201).json({mensaje: "Usuario creado con éxito", usuarioCreado});
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateUsuario(req, res) 
    {
        try {
            const { id } = req.params;
            const { nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena } = req.body;          
        
            const objUsuario = new Usuario();
            const usuarioActualizado = await objUsuario.update(id, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena);
            
            res.status(201).json({mensaje: "Usuario actualizado con éxito", usuarioActualizado});
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchUsuario(req, res) 
    {
        try {
            const { id } = req.params;
      
            const propiedades = req.body;
        
            const objUsuario = new Usuario();
             
            await objUsuario.patch(id, propiedades);
      
            res.status(201).json({ mensaje: "Usuario actualizado" });
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }  
    }

    static async deleteUsuario(req, res) 
    {
        try {
            const { id } = req.params;
      
            const objUsuario = new Usuario();
            await objUsuario.delete(id);      
            
            res.status(201).json({ mensaje: "Usuario eliminado con exito." });
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UsuarioController;