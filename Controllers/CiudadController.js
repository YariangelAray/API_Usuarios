import Ciudad from "../Models/Ciudad.js";

class CiudadController{

    static async getCiudadById(req, res) 
    {
        try {
            const objCiudad = new Ciudad();
            const { id } = req.params;      
            const ciudad = await objCiudad.getById(id);    
            res.json(ciudad);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createCiudad(req, res) 
    {
        try {
            const { nombre } = req.body;        
            const objCiudad = new Ciudad();
            const ciudad = await objCiudad.create(nombre);
            
            res.status(201).json({mensaje: "Ciudad creada", ciudad});
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updateCiudad(req, res) 
    {
        try {
            const { id } = req.params;
            const { nombre } = req.body;          
        
            const objCiudad = new Ciudad();
            const ciudad = await objCiudad.update(id, nombre);
            
            res.status(201).json({mensaje: "Ciudad actualizada", ciudad});
      
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async patchCiudad(req, res) 
    {

    }

    static async deleteCiudad(req, res) 
    {

    }
}

export default CiudadController;