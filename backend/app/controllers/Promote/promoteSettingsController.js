const PromoteSettings = require("../../models/Promote/promoteSettingsModel");

const promoteSettingsController = {
  getPromptsSettings: async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      const settingsData = await PromoteSettings.find(userId);
      res.status(200).json({ status: 200, res: settingsData, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  createOrUpdateSetting: async (req, res) => {
    const user_id = parseInt(req.query.userId);
    const { default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona, id } = req.body;
    try {
      if (!id) {
        await PromoteSettings.add({ default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona ,user_id});
        res.status(201).json({ status: 201, res: null, error: null });
      } else {
        await PromoteSettings.update(id, { default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona,user_id });
        res.status(201).json({ status: 201, res: null, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  deleteSetting: async (req, res) => {
    const { id } = req.params;
    try {
      await PromoteSettings.delete(id);
      res.status(200).json({ status: 200, error: null, res: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  }
};

module.exports = promoteSettingsController;
