import Genero from "../Models/Genero.js";
import Usuario from "../Models/Usuario.js";

class GeneroService{

    constructor(){
        this.objGenero = new Genero();
    }

    async getById(id) {
        try {              
            const genero = await this.objGenero.getById(id);    
            if (genero.length === 0) throw new Error("Género no encontrado.");
            return genero[0]
        } catch (error) {
            throw new Error( error.message || "Error al obtener el género.");
        }     
    }

    async create(nombre){
        try {              
            const genero = await this.objGenero.create(nombre);
            return genero;
        } catch (error) {
            throw new Error("Error al crear el género.");
        } 
    }

    async update(id, nombre){
        try {
            await this.getById(id);
            const genero = await this.objGenero.update(id, nombre);
            return genero;

        } catch (error) {
            throw new Error(error.message || "Error al actualizar el género.");
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
            
            await this.objGenero.patch(id, sentencia);    

        } catch (error) {
            throw new Error(error.message || "Error al actualizar el género.");
        }
    }

    async delete(id){
        try {
            await this.getById(id);
            const objUsuario = new Usuario();            
            const usuarios = await objUsuario.getByIdGenero(id);            
            if (usuarios.length > 0)
                throw new Error("No se puede eliminar el genero porque tiene usuarios relacionados.");
            await this.objGenero.delete(id);

        } catch (error) {
            throw new Error(error.message || "Error al eliminar el género.");
        }
    }
}

export default GeneroService;