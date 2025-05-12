import GeneroService from "../Services/GeneroService.js";

class GeneroController{

    static async getAllGeneros(req, res){
        try {
            const generoService = new GeneroService();
            const generos = await generoService.getAll();
            res.json(generos);          
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async getGeneroById(req, res) 
    {
        try {
            const { id } = req.params;      
            const generoService = new GeneroService();
            const genero = await generoService.getById(id);    
            res.json(genero);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createGenero(req, res) 
    {
        try {
            const { nombre } = req.body;        
            const generoService = new GeneroService();
            const genero = await generoService.create(nombre);
            
            res.status(201).json({mensaje: "Género creado", genero});
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateGenero(req, res) 
    {
        try {
            const { id } = req.params;
            const { nombre } = req.body;                  
            const generoService = new GeneroService();
            const genero = await generoService.update(id, nombre);
            
            res.status(201).json({mensaje: "Género actualizado", genero});
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchGenero(req, res) 
    {
        try {
            const { id } = req.params;
            const propiedades = req.body;
            const generoService = new GeneroService();
            await generoService.patch(id, propiedades);
      
            res.status(201).json({ mensaje: "Género actualizado" });
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }  
    }

    static async deleteGenero(req, res) 
    {
        try {
            const { id } = req.params;      
            const generoService = new GeneroService();
            await generoService.delete(id);      
            
            res.status(201).json({ mensaje: "Género eliminado." });
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default GeneroController