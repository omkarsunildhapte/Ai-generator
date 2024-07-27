const db = require('../../../db/config');

const PromoteSettings = {
    find: async (user_id) => {
        const [rows] = await db.query("SELECT * FROM promote_settings WHERE user_id = ?", [user_id]);
        return rows[0];
    },
    add: async (data) => {
        const { user_id, default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona } = data;
        const query = `INSERT INTO promote_settings (user_id, default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [user_id, default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona]);
        return result.insertId;
    },
    update: async (id, data) => {
        const { user_id, default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona } = data;
        const query = `UPDATE promote_settings SET user_id = ?, default_engine_key = ?, default_engine = ?, default_engine_max_token = ?, bing_search_key = ?, bing_search_status = ?, chat_model = ?, chat_model_persona = ? WHERE id = ?`;
        const [result] = await db.query(query, [user_id, default_engine_key, default_engine, default_engine_max_token, bing_search_key, bing_search_status, chat_model, chat_model_persona, id]);
        return result.affectedRows > 0;
    },
    delete: async (id) => {
        const query = "DELETE FROM promote_settings WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = PromoteSettings;
