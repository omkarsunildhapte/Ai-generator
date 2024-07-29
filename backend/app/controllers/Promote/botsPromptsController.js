const BotPrompt = require('../../models/Promote/botsPromptsModel');

const botsPromptsController = {
  getAllBotPrompts: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const { page, limit, sort, search, subject } = req.body;
    try {
      const botPromptData = { page, limit, sort, search, subject };
      const resData = await BotPrompt.getAll(botPromptData, userId);
      res.status(200).json({ status: 200, res: resData, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  createOrUpdateBotPrompt: async (req, res) => {
    const { id } = req.query;
    const { name, description, default_prompt, subject, keywords, settings } = req.body;
    try {
      const botPromptData = { name, description, default_prompt, subject, keywords, settings };
      if (!id) {
        await BotPrompt.create(botPromptData);
        res.status(201).json({ status: 201, res: null, error: null });
      } else {
        await BotPrompt.update(id, botPromptData);
        res.status(200).json({ status: 200, res: null, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  deleteBotPrompt: async (req, res) => {
    const { id } = req.params;
    try {
      await BotPrompt.delete(id);
      res.status(200).json({ status: 200, error: null, res: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  }
};

module.exports = botsPromptsController;
