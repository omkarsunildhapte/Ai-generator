const Tag = require('../../models/CMS/Tag');

const tagsController = {
  createTag: async (req, res) => {
    try {
      const userId = req.user.id;
      await Tag.create(userId, req.body);
      res.status(201).json({ message: 'Tag created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTag: async (req, res) => {
    try {
      const userId = req.user.id;
      await Tag.update(userId, req.params.id, req.body);
      res.status(200).json({ message: 'Tag updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTag: async (req, res) => {
    try {
      const userId = req.user.id;
      await Tag.delete(userId, req.params.id);
      res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllTags: async (req, res) => {
    try {
      const userId = req.user.id;
      const tags = await Tag.getAll(userId);
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTagById: async (req, res) => {
    try {
      const userId = req.user.id;
      const tag = await Tag.getById(userId, req.params.id);
      res.status(200).json(tag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = tagsController;
