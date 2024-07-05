const Permission = require('../../models/USER/permissionModel');

const permissionController = {
  getAllPermissions: async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      let { page, limit, sort, search } = req.body;
      const permissions = await Permission.get(
        { page, limit, sort, search },
        userId
      );
      res.status(200).json({ status: 200, res: permissions, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  findAllByUserId: async (req, res) => {
    const userId = req.query.userId;
    try {
      const permissions = await Permission.findAllByUserId(userId);
      const modifiedPermissions = permissions.map(permission => ({
        name: permission.name,
        isDefault: permission.isDefault,
        id: permission.id
      }));
      res.status(200).json({ status: 200, res: modifiedPermissions, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, data: null });
    }
  },
  createPermission: async (req, res) => {
    const { name, is_default, id } = req.body;
    const userId = parseInt(req.query.userId);
    try {
      if (id) {
        await Permission.update({ name, is_default, id }, userId);
        res.status(201).json({ status: 201, error: null });
      } else {
        await Permission.create({ name, is_default }, userId);
        res.status(201).json({ status: 201, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  deletePermission: async (req, res) => {
    const { id } = req.params;
    try {
      await Permission.delete(id);
      res.status(200).json({ status: 200, error: null, res: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, data: null });
    }
  },
};

module.exports = permissionController;
