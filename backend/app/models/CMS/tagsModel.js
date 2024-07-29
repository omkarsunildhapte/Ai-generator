const db = require('../../../db/config');

const Tag = {
  create: async (userId, data) => {
    const { name, slug } = data;
    await db.query('INSERT INTO tags (user_id, name, slug) VALUES (?, ?, ?)', [userId, name, slug]);
  },

  update: async (userId, id, data) => {
    const { name, slug } = data;
    await db.query('UPDATE tags SET name = ?, slug = ? WHERE id = ? AND user_id = ?', [name, slug, id, userId]);
  },

  delete: async (userId, id) => {
    await db.query('DELETE FROM tags WHERE id = ? AND user_id = ?', [id, userId]);
  },

  getAll: async (userId) => {
    const [rows] = await db.query('SELECT * FROM tags WHERE user_id = ?', [userId]);
    return rows;
  },

  getById: async (userId, id) => {
    const [rows] = await db.query('SELECT * FROM tags WHERE id = ? AND user_id = ?', [id, userId]);
    return rows[0];
  }
};

module.exports = Tag;
