import LenguajeService from "../Services/LenguajeService.js";

class LenguajeController{

    static async getAllLenguajes(req, res){
        try {
            const lenguajeService = new LenguajeService();
            const lenguajes = await lenguajeService.getAll();
            res.json(lenguajes);          
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async getLenguajeById(req, res) 
    {
        try {
            const { id } = req.params;      
            const lenguajeService = new LenguajeService();
            const lenguaje = await lenguajeService.getById(id);    
            res.json(lenguaje);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createLenguaje(req, res) 
    {
        try {
            const { nombre } = req.body;        
            const lenguajeService = new LenguajeService();
            const lenguaje = await lenguajeService.create(nombre);
            
            res.status(201).json({mensaje: "Lenguaje creado", lenguaje});
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateLenguaje(req, res) 
    {
        try {
            const { id } = req.params;
            const { nombre } = req.body;          
        
            const lenguajeService = new LenguajeService();
            const lenguaje = await lenguajeService.update(id, nombre);
            
            res.status(201).json({mensaje: "Lenguaje actualizado", lenguaje});
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchLenguaje(req, res) 
    {
        try {
            const { id } = req.params;
      
            const propiedades = req.body;
        
            const lenguajeService = new LenguajeService();
             
            await lenguajeService.patch(id, propiedades);
      
            res.status(201).json({ mensaje: "Lenguaje actualizado" });
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }  
    }

    static async deleteLenguaje(req, res) 
    {
        try {
            const { id } = req.params;
      
            const lenguajeService = new LenguajeService();
            await lenguajeService.delete(id);      
            
            res.status(201).json({ mensaje: "Lenguaje eliminado." });
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default LenguajeController;