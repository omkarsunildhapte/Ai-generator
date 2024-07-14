const Category = require("../../models/Promote/categoryModel.js");

const categoryController = {
  createUpdateCategory: async (req, res) => {
    const { name, status, id } = req.body;
    const userId = parseInt(req.query.userId);
    try {
      const resMessage = {
        message: id ? 'Category is successfully updated' : 'Category is successfully created'
      };
      if (id) {
        await Category.update(id, { name, status }, userId);
        res.status(201).json({ status: 201, res: resMessage, error: null });
      } else {
        await Category.create({ name, status }, userId);
        res.status(201).json({ status: 201, res: resMessage, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  getCategories: async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      let { page, limit, sort, search, status } = req.body;
      const categories = await Category.get(
        { page, limit, sort, search, status },
        userId
      );
      res.status(200).json({ status: 200, res: categories, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  getAllCategories: async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      const categories = await Category.getAll(userId);
      res.status(200).json({ status: 200, res: categories, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  deleteCategory: async (req, res) => {
    const categoryId = req.params.id;
    const userId = parseInt(req.query.userId);
    try {
      const resMessage = {
        message: 'Category is successfully deleted'
    };
      await Category.delete(categoryId, userId);
      res.status(200).json({ status: 200, res: resMessage, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
};

module.exports = categoryController;
