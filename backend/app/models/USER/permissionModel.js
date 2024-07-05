const db = require('../../../db/config');

const Permission = {
  get: async ({ page = 1, limit = 10, sort, search }, userId) => {
    try {
      page = parseInt(page);
      limit = parseInt(limit);
      const offset = (page - 1) * limit;

      let query = 'SELECT * FROM permissions WHERE user_id = ?';
      const queryParams = [userId];

      if (search) {
        query += ` AND name LIKE ?`; 
        queryParams.push(`%${search}%`);
      }

      if (sort) {
        const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
        const sortBy = sort.replace(/^-/, '');
        query += ` ORDER BY ${db.escapeId(sortBy)} ${sortOrder}`;
      } else {
        query += ` ORDER BY id ASC`; 
      }

      query += ` LIMIT ? OFFSET ?`;
      queryParams.push(limit, offset);
      const [permissions] = await db.query(query, queryParams);
      const [totalCount] = await db.query('SELECT COUNT(*) AS count FROM permissions WHERE user_id = ?', [userId]);
      return {
        permissions,
        total: totalCount[0].count,
        page,
        totalPages: Math.ceil(totalCount[0].count / limit)
      };
    } catch (error) {
      throw error;
    }
  },

  create: async (permissionData, userId) => {
    const { name, is_default } = permissionData;
    await db.query('INSERT INTO permissions (name, user_id, isDefault) VALUES (?, ?, ?)', [name, userId, is_default]);
  },

  update: async (permissionData, userId) => {
    const { name, is_default, id } = permissionData;
    await db.query('UPDATE permissions SET name = ?, isDefault = ?, updated_by = ? WHERE id = ?', [name, is_default, userId, id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM permissions WHERE id = ?', [id]);
  },
  findAllByUserId: async (userId) => {
    try {
      const [permissions] = await db.query('SELECT * FROM permissions WHERE user_id = ?', [userId]);
      return permissions;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Permission;
