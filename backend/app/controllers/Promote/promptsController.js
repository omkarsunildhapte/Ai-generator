const Prompt = require("../../models/Promote/promptsModel");
const Category = require("../../models/Promote/categoryModel");
const Persona = require("../../models/Promote/personasModel");
const Question = require('../../models/Promote/questionModel');

const promptsController = {
  getAllPrompts: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const { page, limit, sort, search, status, type, category } = req.body;
    try {
      const promptData = { page, limit, sort, search, status, type, category};
      const resData = await Prompt.getAll(promptData,userId);
      res.status(200).json({ status: 200, res: resData, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  createPrompt: async (req, res) => {
    const user_id = parseInt(req.query.userId);
    const { name, status, type, description, questionList, prompt, engine, max_tokens, category, persona, id } = req.body;
    try {
      if (!id) {
        await Prompt.create({ name, status, type, description, questionList, prompt, engine, max_tokens, category, persona }, user_id);
        res.status(201).json({ status: 201, res: null, error: null });
      } else {
        await Prompt.update(id, { name, status, type, description, questionList, prompt, engine, max_tokens, category, persona }, user_id);
        res.status(201).json({ status: 201, res: null, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  deletePrompt: async (req, res) => {
    const { id } = req.params;
    try {
      await Prompt.delete(id);
      res.status(200).json({ status: 200, error: null, res: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  getAllPersonasCategoriesQuestions :async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      const categories = await Category.getAll(userId);
      const personas = await Persona.getAll(userId);
      const questions = await Question.getAll(userId);
      const response = {
        categories: categories,
        personas: personas,
        questions: questions
      };
  
      res.status(200).json({ status: 200, res: response, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, res: null, error: error.message });
    }
  }
};

module.exports = promptsController;
