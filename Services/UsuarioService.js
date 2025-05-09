import Usuario from "../Models/Usuario.js";
import CiudadService from "./CiudadService.js";
import GeneroService from "./GeneroService.js";
import LenguajeService from "./LenguajeService.js";
import LenguajeUsuario from "../Models/LenguajeUsuario.js";

class UsuarioService {

    constructor(){
        this.objUsuario = new Usuario();
        this.ciudadService = new CiudadService();
        this.generoService = new GeneroService();
        this.lenguajeService = new LenguajeService();
        this.objLenguajeUsuario = new LenguajeUsuario();
    }

    async getById(id) {
        try {
            
            const usuario = await this.objUsuario.getById(id);
            if (!usuario) throw new Error("Usuario no encontrado.");
            
            const ciudad = await this.ciudadService.getById(usuario.id_ciudad);
            const genero = await this.generoService.getById(usuario.id_genero);
                
            const lenguajesUsuario = await this.objLenguajeUsuario.getLenguajesByIdUsuario(id);
    
            const lenguajes = await Promise.all(lenguajesUsuario.map(async lenguaje => (await this.lenguajeService.getById(lenguaje.id_lenguaje)).nombre));
            
            return {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            ciudad: ciudad.nombre,
            genero: genero.nombre,
            no_documento: usuario.no_documento,
            usuario: usuario.usuario,
            lenguajes
            };

        } catch (error) {
            throw new Error(error.message || "Error al obtener el usuario.");
        }
    }

    async create(nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena) {
        try {
            // Validar ciudad y genero        
            await this.ciudadService.getById(id_ciudad);
            await this.generoService.getById(id_genero);
                
            const usuarioCreado = await this.objUsuario.create(nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena);
            return this.getById(usuarioCreado.id);        
        } catch (error) {
            throw new Error(error.message || "Error al crear el usuario.");                
        }
    }

    async update(id, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena, lenguajes = []) {
        try {    
            await this.getById(id);
            await this.ciudadService.getById(id_ciudad);
            await this.generoService.getById(id_genero);
                
            await this.objUsuario.update(id, nombre, apellido, telefono, id_ciudad, id_genero, no_documento, usuario, contrasena);    
            return this.getById(id);
        } catch (error) {
            throw new Error(error.message || "Error al actualizar el usuario.");
        }
    
    }

    async patch(id, propiedades) {        
        await this.getById(id);
    
        if (!propiedades || Object.keys(propiedades).length === 0)
            throw new Error("No se han enviado propiedades para actualizar.");
    
        let sentencia = "";
        for (const key in propiedades) {
            if (key === "id_genero") await this.generoService.getById(propiedades[key]);
            if (key === "id_ciudad") await this.ciudadService.getById(propiedades[key]);
            sentencia += `${key} = "${propiedades[key]}", `;
        }
        sentencia = sentencia.slice(0, -2);
        await this.objUsuario.patch(id, sentencia);

        return this.getById(id);
    }
    
    async delete(id) {
        try {
            const usuarioEliminado = await this.getById(id);
            await this.objLenguajeUsuario.deleteLenguajesByIdUsuario(id);
            await this.objUsuario.delete(id);
            return usuarioEliminado;
        } catch (error) {
            throw new Error(error.message || "Error al eliminar el usuario.");
        }
    }
}

export default UsuarioService;