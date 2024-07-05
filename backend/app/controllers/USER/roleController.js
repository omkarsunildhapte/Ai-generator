const Role = require("../../models/USER/rolesModel");
const roleController = {
  getAllRoles: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.body;
      const userId = parseInt(req.query.userId);
      const roles = await Role.get({ page, limit, sort, search }, userId);
      res.status(200).json({ status: 200, res: roles, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, data: null });
    }
  },
  findAllByUserId: async (req, res) => {
    const userId = req.query.userId;
    try {
      const roles = await Role.findAllByUserId(userId);
      const modifiedRoles = roles.map((role) => ({
        name: role.name,
        isDefault: role.isDefault,
        id: role.id,
      }));
      res.status(200).json({ status: 200, res: modifiedRoles, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, data: null });
    }
  },
  createRole: async (req, res) => {
    const { name, permissions, id } = req.body;
    const userId = parseInt(req.query.userId);
    try {
      if (name && permissions.length) {
        if (id) {
          await Role.update({ id, name, permissions }, userId);
          res.status(201).json({ status: 201, error: null, data: null });
        } else {
          await Role.create({ name, permissions }, userId);
          res.status(201).json({ status: 201, data: null, error: null });
        }
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, data: null });
    }
  },
  deleteRole: async (req, res) => {
    const userId = req.params.id;
    try {
      if (userId) {
        await Role.delete(userId);
        res.status(200).json({ status: 200, res: null, error: null });
      } else {
        res.status(400).json({ status: 400, error: "User Id Need" });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
};

module.exports = roleController;
