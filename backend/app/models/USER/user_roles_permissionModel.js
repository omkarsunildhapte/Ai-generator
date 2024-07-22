const db = require('../../../db/config');

const UserRolesPermission = {
    find: async (id) => {
        const [rows] = await db.query("SELECT * FROM user_roles_permission WHERE id = ?", [id]);
        return rows[0];
    },
    add: async (data) => {
        const { id, roles } = data;
        const query = "INSERT INTO user_roles_permission (id, roles) VALUES (?, ?)";
        const [result] = await db.query(query, [id, JSON.stringify(roles)]);
        return result.insertId;
    },
    update: async (id, data) => {
        const { roles } = data;
        const query = "UPDATE user_roles_permission SET roles = ? WHERE id = ?";
        const [result] = await db.query(query, [JSON.stringify(roles), id]);
        return result.affectedRows > 0;
    },
};

module.exports = UserRolesPermission;
