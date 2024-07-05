const db = require('../../../db/config');

const Plan = {
  get: async ({ user_id, page = 1, limit = 10, sort, search }) => {
    try {
      page = parseInt(page);
      limit = parseInt(limit);
      const offset = (page - 1) * limit;
      let query = 'SELECT * FROM plans WHERE user_id = ?';
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

      const [plans] = await db.query(query, queryParams);
      const [totalCount] = await db.query('SELECT COUNT(*) AS count FROM plans WHERE user_id = ?', [user_id]);

      return {
        plans,
        total: totalCount[0].count,
        page,
        totalPages: Math.ceil(totalCount[0].count / limit)
      };
    } catch (error) {
      throw error;
    }
  },

  create: async (planData, user_id) => {
    const { name, description, features, plan_type, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key } = planData;
    await db.query('INSERT INTO plans (user_id, name, description, features, plan_type, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [user_id, name, description, features, plan_type, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key]);
  },

  update: async (id, planData, user_id) => {
    const { name, description, features, plan_type, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key } = planData;
    await db.query('UPDATE plans SET name = ?, description = ?, features = ?, plan_type = ?, price = ?, currency_name = ?, type = ?, word_limit = ?, image_limit = ?, seats_limit = ?, payment_api_key = ?, payment_api_webhook = ?, secret_key = ? WHERE id = ? AND user_id = ?', [name, description, features, plan_type, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key, id, user_id]);
  },


  delete: async (id, user_id) => {
    await db.query('DELETE FROM plans WHERE id = ? AND user_id = ?', [id, user_id]);
  }
};

module.exports = Plan;
