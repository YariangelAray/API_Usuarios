import CiudadService from "../Services/CiudadService.js";

class CiudadController{

    static async getCiudadById(req, res) 
    {
        try {
            const { id } = req.params;      
            const ciudadService = new CiudadService();
            const ciudad = await ciudadService.getById(id);
            res.json(ciudad);          

        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createCiudad(req, res) 
    {
        try {
            const { nombre } = req.body;                    
            const ciudadService = new CiudadService();
            const ciudad = await ciudadService.create(nombre);        
            res.status(201).json({mensaje: "Ciudad creada.", ciudad});      

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateCiudad(req, res) 
    {
        try {
            const { id } = req.params;
            const { nombre } = req.body;                              
            const ciudadService = new CiudadService();
            const ciudad = await ciudadService.update(id, nombre);        
            res.status(201).json({mensaje: "Ciudad actualizada.", ciudad});
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchCiudad(req, res) 
    {
        try {
            const { id } = req.params;
            const propiedades = req.body;
            const ciudadService = new CiudadService();
            await ciudadService.patch(id, propiedades);
            res.status(201).json({ mensaje: "Ciudad actualizada." });
            
          } catch (error) {
            res.status(500).json({ error: error.message });
          }  
    }

    static async deleteCiudad(req, res) 
    {
        try {
            const { id } = req.params;                  
            const ciudadService = new CiudadService();
            await ciudadService.delete(id);              
            res.status(201).json({ mensaje: "Ciudad eliminada." });
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CiudadController;