const db = require('../../../db/config');

const Category = {
  get: async ({ page, limit, sort, search, status }, userId) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    

    let query = 'SELECT * FROM categories WHERE user_id = ?';
    const queryParams = [userId];

    if (status !== null) {
      query += ' AND status = ?';
      queryParams.push(status);
    }
    if (search) {
      query += ' AND name LIKE ?';
      queryParams.push(`%${search}%`);
    }

    if (sort) {
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      const sortBy = sort.replace(/^-/, '');
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    } else {
      query += ' ORDER BY id DESC';
    }

    query += ' LIMIT ? OFFSET ?';
    const offset = (page - 1) * limit;
    queryParams.push(limit, offset);
    const [categories] = await db.query(query, queryParams);
    const [totalCount] = await db.query( 'SELECT COUNT(*) AS count FROM categories WHERE user_id = ?', [userId]);
    return { categories, total: totalCount[0].count, page, totalPages: Math.ceil(totalCount[0].count / limit), };
  },

  getAll: async (userId) => {
    const [user] = await db.query('SELECT name,id FROM categories WHERE user_id = ? AND status = 1', [userId]);
    return user;
  },

  create: async (categoryData, userId) => {
    const { name, status } = categoryData;
    await db.query('INSERT INTO categories (name, status, user_id) VALUES (?, ?, ?)', [name, status, userId]);
  },

  update: async (id, categoryData, userId) => {
    const { name, status } = categoryData;
    await db.query('UPDATE categories SET name = ?, status = ? WHERE id = ? AND user_id = ?', [name, status, id, userId]);
  },

  delete: async (id, userId) => {
    await db.query('DELETE FROM categories WHERE id = ? AND user_id = ?', [id, userId]);
  }
};

module.exports = Category;
