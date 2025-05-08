import Ciudad from "../Models/Ciudad.js";
import Usuario from "../Models/Usuario.js";

class CiudadService{

    constructor(){
        this.objCiudad = new Ciudad();
    }

    async getById(id) {
        try {              
            const ciudad = await this.objCiudad.getById(id);    
            if (ciudad.length === 0) throw new Error("Ciudad no encontrada.");
            return ciudad[0]
        } catch (error) {
            throw new Error( error.message || "Error al obtener la ciudad.");
        }     
    }

    async create(nombre){
        try {              
            const ciudad = await this.objCiudad.create(nombre);
            return ciudad;
        } catch (error) {
            throw new Error("Error al crear la ciudad.");
        } 
    }

    async update(id, nombre){
        try {
            await this.getById(id);
            const ciudad = await this.objCiudad.update(id, nombre);
            return ciudad;

        } catch (error) {
            throw new Error(error.message || "Error al actualizar la ciudad.");
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
            
            await this.objCiudad.patch(id, sentencia);    

        } catch (error) {
            throw new Error(error.message || "Error al actualizar la ciudad.");
        }
    }

    async delete(id){
        try {
            await this.getById(id);
            const objUsuario = new Usuario();            
            const usuarios = await objUsuario.getByIdCiudad(id);            
            if (usuarios.length > 0)
                throw new Error("No se puede eliminar la ciudad porque tiene usuarios relacionados.");
            await this.objCiudad.delete(id);

        } catch (error) {
            throw new Error(error.message || "Error al eliminar la ciudad.");
        }
    }
}

export default CiudadService;