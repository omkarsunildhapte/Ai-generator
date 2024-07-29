const Page = require('../../models/CMS/Page');

const pagesController = {
  createPage: async (req, res) => {
    try {
      const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID
      await Page.create(userId, req.body);
      res.status(201).json({ message: 'Page created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePage: async (req, res) => {
    try {
      const userId = req.user.id;
      await Page.update(userId, req.params.id, req.body);
      res.status(200).json({ message: 'Page updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePage: async (req, res) => {
    try {
      const userId = req.user.id;
      await Page.delete(userId, req.params.id);
      res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllPages: async (req, res) => {
    try {
      const userId = req.user.id;
      const pages = await Page.getAll(userId);
      res.status(200).json(pages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPageById: async (req, res) => {
    try {
      const userId = req.user.id;
      const page = await Page.getById(userId, req.params.id);
      res.status(200).json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = pagesController;
