const Persona = require("../../models/Promote/personasModel");

const personaController = {
  createPersona: async (req, res) => {
    const { name, description, files, website, id } = req.body;
    const userId = parseInt(req.query.userId);
    try {
      if (id) {
        await Persona.update(id, { name, description, files, website }, userId);
        res.status(201).json({ status: 201, res: null, error: null });
      } else {
        await Persona.create({ name, description, files, website }, userId);
        res.status(201).json({ status: 201, res: null, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  getPersonas: async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      let { page, limit, sort, search, status } = req.body;
      const personas = await Persona.get({ page, limit, sort, search, status }, userId);
      res.status(200).json({ status: 200, res: personas, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  
  getAllPersonas: async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      const personas = await Persona.getAll(userId);
      res.status(200).json({ status: 200, res: personas, error: null });
    }
    catch (error) {
      res.status(500).json({ status: 500, error: error.message,res:null });
    }
  },
  deletePersona: async (req, res) => {
    const personaId = req.params.id;
    const userId = parseInt(req.query.userId);
    try {
      await Persona.delete(personaId, userId);
      res.status(200).json({ status: 200, res: null, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
};

module.exports = personaController;
