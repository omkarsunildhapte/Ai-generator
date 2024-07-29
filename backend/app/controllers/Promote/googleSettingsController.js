const GoogleSettings = require('../../models/Promote/googleSettingsModel');

const googleSettingsController = {
  getSettings: async (req, res) => {
    try {
      const userId = parseInt(req.query.userId);
      const settings = await GoogleSettings.getSettings(userId);
      res.status(200).json({ status: 200, res: settings, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, res: null, error: error.message });
    }
  },

  saveSettings: async (req, res) => {
    try {
      const userId = parseInt(req.query.userId);
      const settings = req.body;

      // Check if settings already exist
      const existingSettings = await GoogleSettings.getSettings(userId);
      if (existingSettings) {
        await GoogleSettings.updateSettings(userId, settings);
        res.status(200).json({ status: 200, res: { message: 'Settings updated successfully' }, error: null });
      } else {
        await GoogleSettings.insertSettings(userId, settings);
        res.status(201).json({ status: 201, res: { message: 'Settings inserted successfully' }, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, res: null, error: error.message });
    }
  },

  deleteSettings: async (req, res) => {
    try {
      const userId = parseInt(req.query.userId);
      await GoogleSettings.deleteSettings(userId);
      res.status(200).json({ status: 200, res: { message: 'Settings deleted successfully' }, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, res: null, error: error.message });
    }
  }
};

module.exports = googleSettingsController;
