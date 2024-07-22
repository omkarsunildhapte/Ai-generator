const Role = require("../../models/USER/rolesModel");
const User = require("../../models/USER/userModel");
const UserRolesPermission = require("../../models/USER/user_roles_permissionModel");
const roleController = {
  getAllRoles: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.body;
      const userId = parseInt(req.query.userId);
      const tenantId = parseInt(req.query.tenantId);
      let roles = await Role.get({ page, limit, sort, search }, userId);
      for (let i = 0; i < roles.roles.length; i++) {
        const { updated_by } = roles.roles[i];
        if (updated_by) {
          const updateName = await User.findOut(updated_by, tenantId);
          roles.roles[i].updateName = `${updateName.name} ${updateName.surname}`;
        } else {
          roles.roles[i].updatedName = null;
          roles.roles[i].updated_at = null;
        }
      }
      res.status(200).json({ status: 200, res: roles, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, data: null });
    }
  },
  createRole: async (req, res) => {
    const { name, permission, id, status } = req.body;
    const userId = parseInt(req.query.userId);
    try {
      if (name && permission.length) {
        if (id) {
          await Role.update({ id, name, permission, status }, userId);
          res.status(201).json({ status: 201, error: null, data:null });
        } else {
          await Role.create({ name, permission, status }, userId);
          const SuperAdmin = await UserRolesPermission.find(1);
          const SuperAdminRoles = SuperAdmin.roles.map(e=>e.role_id);
          const allRoleIds = await Role.getRolesAllId();
          const missingRoleIds = allRoleIds.map(e => e.id).filter(id => !SuperAdminRoles.some(role => role === id));
          const missingRolesData = [];
          for (const id of missingRoleIds) {
            const data = await Role.getRoleId(id);
            missingRolesData.push(data);
          }
          missingRolesData.forEach(missingRole => {
                if (!SuperAdminRoles.some(role => role.role_id === missingRole.id)) {
                  SuperAdmin.roles.push({
                        role_id: missingRole.id,
                        role_name: missingRole.name,
                        permissions: JSON.stringify(missingRole.permissions)
                    });
                }
            });
          await UserRolesPermission.update(1, { roles: SuperAdmin.roles });
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
