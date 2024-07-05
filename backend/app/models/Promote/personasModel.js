const db = require('../../../db/config');

const Personas = {
  get: async ({ page, limit, sort, search, status }, userId) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM personas WHERE user_id = ?';
    const queryParams = [userId];

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
    queryParams.push(limit, offset);

    const [personas] = await db.query(query, queryParams);

    const [totalCount] = await db.query(
      'SELECT COUNT(*) AS count FROM personas WHERE user_id = ?', [userId]);

    return {
      personas,
      total: totalCount[0].count,
      page,
      totalPages: Math.ceil(totalCount[0].count / limit),
    };
  },
  getAll: async (userId) => {
    const [user] =  await db.query('SELECT name,id FROM personas WHERE user_id = ?', [userId]);
    return user;
  },
  create: async (categoryData, userId) => {
    const { name, description, files, website } = categoryData;
    const filesJson = JSON.stringify(files);
    await db.query('INSERT INTO personas (name, description, files, website, user_id) VALUES (?, ?, ?, ?, ?)', [name, description, filesJson, website, userId]);
  },
  update: async (id, categoryData, userId) => {
    const { name, description, files, website } = categoryData;
    const filesJson = JSON.stringify(files);
    await db.query('UPDATE personas SET name = ?, description = ?, files = ?, website = ? WHERE id = ? AND user_id = ?', [name, description, filesJson, website, id, userId]);
  },
  delete: async (id, userId) => {
    await db.query('DELETE FROM personas WHERE id = ? AND user_id = ?', [id, userId]);
  }
};

module.exports = Personas;
