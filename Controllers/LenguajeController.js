import Lenguaje from "../Models/Lenguaje.js";

class LenguajeController{
    static async getLenguajeById(req, res) 
    {
        try {
            const objLenguaje = new Lenguaje();
            const { id } = req.params;      
            const lenguaje = await objLenguaje.getById(id);    
            res.json(lenguaje);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createLenguaje(req, res) 
    {
        try {
            const { nombre } = req.body;        
            const objLenguaje = new Lenguaje();
            const lenguaje = await objLenguaje.create(nombre);
            
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
        
            const objLenguaje = new Lenguaje();
            const lenguaje = await objLenguaje.update(id, nombre);
            
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
        
            const objLenguaje = new Lenguaje();
             
            await objLenguaje.patch(id, propiedades);
      
            res.status(201).json({ mensaje: "Lenguaje actualizado" });
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }  
    }

    static async deleteLenguaje(req, res) 
    {
        try {
            const { id } = req.params;
      
            const objLenguaje = new Lenguaje();
            await objLenguaje.delete(id);      
            
            res.status(201).json({ mensaje: "Lenguaje eliminado con exito." });
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default LenguajeController;