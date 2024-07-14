const db = require('../../../db/config');

const Question = {
  get: async ({ page, limit, sort, search, required, type }, user_id) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let query = 'SELECT * FROM questions WHERE user_id = ?';
    const queryParams = [user_id];

    if (required !== null) {
      query += ' AND required = ?';
      queryParams.push(required);
    }
    if (type !== null) {
      query += ' AND type = ?';
      queryParams.push(type);
    }
    if (search) {
      query += ' AND question_text LIKE ?';
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
    const [questions] = await db.query(query, queryParams);
    const [totalCount] = await db.query('SELECT COUNT(*) AS count FROM questions WHERE user_id = ?', [user_id]);
    return { questions, total: totalCount[0].count, page, totalPages: Math.ceil(totalCount[0].count / limit) };
  },

  getAll: async (userId) => {
    const [questions] = await db.query('SELECT id, question_text FROM questions WHERE user_id = ?', [userId]);
    return questions;
  },

  create: async (questionData, user_id) => {
    const { question_text, type, required, answer_length, options } = questionData;
    await db.query('INSERT INTO questions (question_text, type, required, answer_length, user_id, options) VALUES (?, ?, ?, ?, ?, ?)', [question_text, type, required, answer_length, user_id, JSON.stringify(options)]);
  },

  update: async (id, questionData, user_id) => {
    const { question_text, type, required, answer_length, options } = questionData;
    await db.query('UPDATE questions SET question_text = ?, type = ?, required = ?, answer_length = ?, user_id = ?, options = ? WHERE id = ?', [question_text, type, required, answer_length, user_id, JSON.stringify(options), id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM questions WHERE id = ?', [id]);
  }
};

module.exports = Question;
