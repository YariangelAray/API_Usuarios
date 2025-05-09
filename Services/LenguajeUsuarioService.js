import LenguajeUsuario from "../Models/LenguajeUsuario.js";
import Usuario from "../Models/Usuario.js";
import LenguajeService from "./LenguajeService.js";


class LenguajeUsuarioService {

    constructor() {
        this.objLenguajeUsuario = new LenguajeUsuario();
        this.usuarioService = new Usuario();
        this.lenguajeService = new LenguajeService();
    }

    async getById(id) {
        try {
          const registro = await objLenguajeUsuario.getById(id);
          if (registro.length === 0) throw new Error("La relación lenguaje-usuario no existe.");
          return registro[0];
        } catch (error) {
          throw new Error(error.message || "Error al obtener la relación lenguaje-usuario.");
        }
    }

    async getLenguajesByIdUsuario(idUsuario) {
        try {          
          await this.usuarioService.getById(idUsuario);
          const lenguajesUsuario = await this.objLenguajeUsuario.getLenguajesByIdUsuario(idUsuario);
          return lenguajesUsuario;
        } catch (error) {
          throw new Error(error.message || "Error al obtener los lenguajes del usuario.");
        }
    }

    async getUsuariosByIdLenguaje(idLenguaje) {
        try {    
            await this.lenguajeService.getById(idLenguaje);
            const usuariosLenguaje = await this.objLenguajeUsuario.geUsuariosByIdLenguaje(idLenguaje);
            return usuariosLenguaje;
        } catch (error) {
            throw new Error(error.message || "Error al obtener los usuarios del lenguaje.");
        }
    }

    async create(id_usuario, id_lenguaje) {
        try {
          // Validar usuario y lenguaje
          await this.usuarioService.getById(id_usuario);
          await this.lenguajeService.getById(id_lenguaje);
    
          const lenguajeUsuario = await this.objLenguajeUsuario.create(id_usuario, id_lenguaje);
          return lenguajeUsuario;
        } catch (error) {
          throw new Error(error.message || "Error al crear la relación lenguaje-usuario.");
        }
    }

    async update(id, id_usuario, id_lenguaje) {
        try {          
          await this.getById(id);
          await this.usuarioService.getById(id_usuario);
          await this.lenguajeService.getById(id_lenguaje);
    
          const lenguajeUsuario = await LenguajeUsuarioModel.update(id, id_usuario, id_lenguaje);
          return lenguajeUsuario;
        } catch (error) {
          throw new Error(error.message || "Error al actualizar la relación lenguaje-usuario.");
        }
    }

    async patch(id, propiedades) {
        try {
          await this.getById(id);

          if (!propiedades || Object.keys(propiedades).length === 0)
            throw new Error("No se han enviado propiedades para actualizar.");
    
          let sentencia = "";
          for (const key in propiedades) {
            if (key === "id_usuario") await this.usuarioService.getById(propiedades[key]);
            if (key === "id_lenguaje") await this.lenguajeService.getById(propiedades[key]);
            sentencia += `${key} = "${propiedades[key]}", `;
          }
          sentencia = sentencia.slice(0, -2);
    
          await this.objLenguajeUsuario.patch(id, sentencia);
        } catch (error) {
          throw new Error(error.message || "Error al actualizar la relación lenguaje-usuario.");
        }
    }
    
    async delete(id) {
        try {
            await this.getById(id);
            await this.objLenguajeUsuario.delete(id);
        } catch (error) {
            throw new Error(error.message || "Error al eliminar la relación lenguaje-usuario.");
        }
    }

    async deleteLenguajesByIdUsuario(id_usuario) {
        try {          
          await this.usuarioService.getById(id_usuario);
          await this.objLenguajeUsuario.deleteLenguajesByIdUsuario(id_usuario);
        } catch (error) {
          throw new Error(error.message || "Error al eliminar los lenguajes del usuario.");
        }
    }
}

export default LenguajeUsuarioService;