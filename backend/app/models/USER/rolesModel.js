const db = require('../../../db/config');

const Role = {
    get: async ({ page, limit, sort, search }, userId) => {
        try {
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;

            let query = 'SELECT * FROM roles WHERE user_id = ?';
            const queryParams = [userId];

            if (search) {
                query += ` AND name LIKE ?`; 
                queryParams.push(`%${search}%`);
              }

            if (sort) {
                const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
                const sortBy = sort.replace(/^-/, '');
                query += ` ORDER BY ${db.escapeId(sortBy)} ${sortOrder}`;
            }

            query += ` LIMIT ? OFFSET ?`;
            queryParams.push(limit, offset);

            const [roles] = await db.query(query, queryParams);
            const [totalCount] = await db.query('SELECT COUNT(*) AS count FROM roles');

            return {
                roles,
                total: totalCount[0].count,
                page,
                totalPages: Math.ceil(totalCount[0].count / limit)
            };
        } catch (error) {
            throw error;
        }
    },

    create: async (roleData, userId) => {
        const { name, permissions } = roleData;
        await db.query('INSERT INTO roles (name, user_id, permissions) VALUES (?, ?, ?)', [name, userId, JSON.stringify(permissions)]);
    },

    update: async (roleData, updatedBy) => {
        const { id, name, permissions } = roleData;
        await db.query('UPDATE roles SET name = ?, permissions = ?, updated_by = ? WHERE id = ?', [name, JSON.stringify(permissions), updatedBy, id]);
    },
    delete: async (id) => {
        await db.query('DELETE FROM roles WHERE id = ?', [id]);
    },
    findAllByUserId: async (userId) => {
        try {
            const [roles] = await db.query('SELECT * FROM roles WHERE user_id = ?', [userId]);
            return roles;
        } catch (error) {
            throw error;
        }
    },
    getPermissionsByRoleId :async (roleId)=>{
        const [roles] = await db.query('SELECT * FROM roles WHERE id = ?', [roleId]);
      return roles.map(permission => permission.permissions);
    }
};

module.exports = Role;
