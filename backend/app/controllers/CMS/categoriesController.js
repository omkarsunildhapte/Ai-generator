const Category = require('../../models/CMS/Category');

const categoriesController = {
  createCategory: async (req, res) => {
    try {
      const userId = req.user.id;
      await Category.create(userId, req.body);
      res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const userId = req.user.id;
      await Category.update(userId, req.params.id, req.body);
      res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const userId = req.user.id;
      await Category.delete(userId, req.params.id);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const userId = req.user.id;
      const categories = await Category.getAll(userId);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const userId = req.user.id;
      const category = await Category.getById(userId, req.params.id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = categoriesController;
