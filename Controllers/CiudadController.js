import Ciudad from "../Models/Ciudad.js";

class CiudadController{

    static async getCiudadById(req, res) 
    {
        try {
            const { id } = req.params;      
            const objCiudad = new Ciudad();      
            const ciudad = await objCiudad.getById(id);    
            res.json(ciudad);    
      
        } catch (error) {
            res.status(500).json({error: error.message});
        }        
    }

    static async createCiudad(req, res) 
    {

    }

    static async updateCiudad(req, res) 
    {

    }

    static async patchCiudad(req, res) 
    {

    }

    static async deleteCiudad(req, res) 
    {

    }
}

export default CiudadController;