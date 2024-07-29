const db = require('../../../db/config');

const BotPrompt = {
  getAll: async ({ page = 1, limit = 10, sort, search, subject }, user_id) => {
    page = parseInt(page);
    limit = parseInt(limit);
   
    let query = 'SELECT * FROM bots_prompts WHERE user_id = ?';
    const queryParams = [user_id];

    if (search) {
      query += ' AND name LIKE ?';
      queryParams.push(`%${search}%`);
    }

    if (subject !== null) {
      query += ' AND subject = ?';
      queryParams.push(subject);
    }

    if (sort) {
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      const sortBy = sort.replace(/^-/, '');
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    }
    query += ' LIMIT ? OFFSET ?';
    const offset = (page - 1) * limit;
    queryParams.push(limit, offset);
    const [botsPrompts] = await db.query(query, queryParams);
    const [totalCount] = await db.query('SELECT COUNT(*) AS count FROM bots_prompts WHERE user_id = ?', [user_id]);
    return { botsPrompts, total: totalCount[0].count, page, totalPages: Math.ceil(totalCount[0].count / limit) };
  },

  create: async (botPromptData) => {
    const { name, description, default_prompt, subject, keywords, settings } = botPromptData;
    await db.query('INSERT INTO bots_prompts (name, description, default_prompt, subject, keywords, settings) VALUES (?, ?, ?, ?, ?, ?)', [name, description, default_prompt, subject, JSON.stringify(keywords), JSON.stringify(settings)]);
  },

  update: async (id, botPromptData) => {
    const { name, description, default_prompt, subject, keywords, settings } = botPromptData;
    await db.query('UPDATE bots_prompts SET name = ?, description = ?, default_prompt = ?, subject = ?, keywords = ?, settings = ? WHERE id = ?', [name, description, default_prompt, subject, JSON.stringify(keywords), JSON.stringify(settings), id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM bots_prompts WHERE id = ?', [id]);
  }
};

module.exports = BotPrompt;
