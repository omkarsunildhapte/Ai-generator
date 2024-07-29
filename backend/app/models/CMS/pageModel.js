const db = require('../../../db/config');

const Page = {
  create: async (userId, data) => {
    const { title, content, slug, status } = data;
    await db.query('INSERT INTO pages (user_id, title, content, slug, status) VALUES (?, ?, ?, ?, ?)', [userId, title, content, slug, status]);
  },

  update: async (userId, id, data) => {
    const { title, content, slug, status } = data;
    await db.query('UPDATE pages SET title = ?, content = ?, slug = ?, status = ? WHERE id = ? AND user_id = ?', [title, content, slug, status, id, userId]);
  },

  delete: async (userId, id) => {
    await db.query('DELETE FROM pages WHERE id = ? AND user_id = ?', [id, userId]);
  },

  getAll: async (userId) => {
    const [rows] = await db.query('SELECT * FROM pages WHERE user_id = ?', [userId]);
    return rows;
  },

  getById: async (userId, id) => {
    const [rows] = await db.query('SELECT * FROM pages WHERE id = ? AND user_id = ?', [id, userId]);
    return rows[0];
  }
};

module.exports = Page;
