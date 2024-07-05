const Plan = require('../../models/USER/planModel');

const planController = {
  getAllPlan: async (req, res) => {
    try {
      let { page = 1, limit = 10, sort, search } = req.query;
      const user_id = parseInt(req.query.userId);
      const plans = await Plan.get({ user_id, page, limit, sort, search });
      res.status(200).json({ status: 200, res: plans, error: null });
    } catch (error) {
      res.status(500).json({ error: error.message, status: 500, res: null });
    }
  },

  createOrUpdatePlan: async (req, res) => {
    const user_id = parseInt(req.query.userId);
    const { name, description, plan_type,features, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key, id } = req.body;
    try {
      if (id) {
        await Plan.update(id, { name, features,description, plan_type, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key }, user_id);
        res.status(201).json({ status: 201, res: null, error: null });
      } else {
        await Plan.create({ name, features,description, plan_type, price, currency_name, type, word_limit, image_limit, seats_limit, payment_api_key, payment_api_webhook, secret_key },user_id);
        res.status(201).json({ status: 201, res: null, error: null });
      }
    } catch (error) {
      res.status(500).json({ error: error.message, status: 500, res: null });
    }
  },

  deletePlan: async (req, res) => {
    const user_id = parseInt(req.query.userId);
    const { id } = req.params;
    try {
      await Plan.delete(id, user_id);
      res.status(200).json({ res: null, status: 200, error: null });
    } catch (error) {
      res.status(500).json({ error: error.message, res: null, status: 500 });
    }
  }
};

module.exports = planController;
