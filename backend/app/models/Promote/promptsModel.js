const db = require('../../../db/config');

const Prompt = {
  getAll: async ({ page = 1, limit = 10, sort, search }, user_id) => {
    try {
      page = parseInt(page);
      limit = parseInt(limit);
      const offset = (page - 1) * limit;
      let query = 'SELECT * FROM prompts WHERE user_id = ?';
      const queryParams = [user_id];

      if (search) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${search}%`);
      }

      if (sort) {
        const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
        const sortBy = sort.replace(/^-/, '');
        query += ` ORDER BY ${sortBy} ${sortOrder}`;
      }

      query += ' LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);

      const [prompts] = await db.query(query, queryParams);
      const [totalCount] = await db.query('SELECT COUNT(*) AS count FROM prompts WHERE user_id = ?', [user_id]);

      return {
        prompts,
        total: totalCount[0].count,
        page,
        totalPages: Math.ceil(totalCount[0].count / limit)
      };
    } catch (error) {
      throw error;
    }
  },

  create: async (promptData, user_id) => {
    const { name, status, type, description, questionList, prompt, engine, max_tokens, category, persona } = promptData;
    await db.query('INSERT INTO prompts (name, status, type, description, question_list, prompt, engine, max_tokens, category, persona, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, status, type, description, JSON.stringify(questionList), prompt, engine, max_tokens, category, persona, user_id]);
  },

  update: async (id, promptData, user_id) => {
    const { name, status, type, description, questionList, prompt, engine, max_tokens, category, persona } = promptData;
    await db.query('UPDATE prompts SET name = ?, status = ?, type = ?, description = ?, question_list = ?, prompt = ?, engine = ?, max_tokens = ?, category = ?, persona = ? WHERE id = ? AND user_id = ?',[name, status, type, description, JSON.stringify(questionList), prompt, engine, max_tokens, category, persona, id, user_id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM prompts WHERE id = ?', [id]);
  }
};

module.exports = Prompt;
