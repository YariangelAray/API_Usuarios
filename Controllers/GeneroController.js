import Genero from "../Models/Genero.js";

class GeneroController{

    static async getGeneroById(req, res) 
    {
        try {
            const objGenero = new Genero();
            const { id } = req.params;      
            const ciudad = await objGenero.getById(id);    
            res.json(ciudad);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createGenero(req, res) 
    {
        try {
            const { nombre } = req.body;        
            const objGenero = new Genero();
            const ciudad = await objGenero.create(nombre);
            
            res.status(201).json({mensaje: "Genero creado", ciudad});
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateGenero(req, res) 
    {
        try {
            const { id } = req.params;
            const { nombre } = req.body;          
        
            const objGenero = new Genero();
            const ciudad = await objGenero.update(id, nombre);
            
            res.status(201).json({mensaje: "Genero actualizado", ciudad});
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchGenero(req, res) 
    {
        try {
            const { id } = req.params;
      
            const propiedades = req.body;
        
            const objGenero = new Genero();
             
            await objGenero.patch(id, propiedades);
      
            res.status(201).json({ mensaje: "Genero actualizado" });
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }  
    }

    static async deleteGenero(req, res) 
    {
        try {
            const { id } = req.params;
      
            const objGenero = new Genero();
            await objGenero.delete(id);      
            
            res.status(201).json({ mensaje: "Genero eliminado con exito." });
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default GeneroController