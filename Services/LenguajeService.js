import Lenguaje from "../Models/Lenguaje.js";
import LenguajeUsuario from "../Models/LenguajeUsuario.js";

class LenguajeService{

    constructor(){
        this.objLenguaje = new Lenguaje();
    }

    async getById(id) {
        try {              
            const lenguaje = await this.objLenguaje.getById(id);    
            if (lenguaje.length === 0) throw new Error("Lenguaje no encontrado.");
            return lenguaje[0]
        } catch (error) {
            throw new Error( error.message || "Error al obtener el lenguaje.");
        }     
    }

    async create(nombre){
        try {              
            const lenguaje = await this.objLenguaje.create(nombre);
            return lenguaje;
        } catch (error) {
            throw new Error("Error al crear el lenguaje.");
        } 
    }

    async update(id, nombre){
        try {
            await this.getById(id);
            const lenguaje = await this.objLenguaje.update(id, nombre);
            return lenguaje;

        } catch (error) {
            throw new Error(error.message || "Error al actualizar el lenguaje.");
        } 
    }

    async patch(id, propiedades){
        try {
            await this.getById(id);

            if (!propiedades)
                throw new Error("No se han enviado propiedades para actualizar.");

            let sentencia = "";            
            for (const key in propiedades)
              sentencia += `${key} = "${propiedades[key]}", `;            
            sentencia = sentencia.slice(0, -2);
            
            await this.objLenguaje.patch(id, sentencia);    

        } catch (error) {
            throw new Error(error.message || "Error al actualizar el lenguaje.");
        }
    }

    async delete(id){
        try {

            await this.getById(id);

            const objUsuariosLeng = new LenguajeUsuario();
            // Verificamos si el lenguaje tiene usuarios relacionados
            const usuarios = await objUsuariosLeng.geUsuariosByIdLenguaje(id);
                
            if (usuarios.length > 0)
              throw new Error("No se puede eliminar el lenguaje porque tiene usuarios relacionados.");
            
            await this.objLenguaje.delete(id);      
            
            return;
    
          } catch (error) {    
            throw new Error(error.message || "Error al eliminar el lenguaje.");
          }
    }
}

export default LenguajeService;