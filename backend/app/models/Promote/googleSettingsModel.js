const db = require('../../../db/config');

const GoogleSettings = {
  getSettings: async (userId) => {
    const [rows] = await db.query('SELECT * FROM google_settings WHERE user_id = ?', [userId]);
    return rows[0];
  },

  insertSettings: async (userId, settings) => {
    const { enable_login_google, google_client_id, google_client_secret, google_callback_url, custom_script } = settings;
    await db.query(
      'INSERT INTO google_settings (user_id, enable_login_google, google_client_id, google_client_secret, google_callback_url, custom_script) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, enable_login_google, google_client_id, google_client_secret, google_callback_url, custom_script]
    );
  },

  updateSettings: async (userId, settings) => {
    const { enable_login_google, google_client_id, google_client_secret, google_callback_url, custom_script } = settings;
    await db.query(
      'UPDATE google_settings SET enable_login_google = ?, google_client_id = ?, google_client_secret = ?, google_callback_url = ?, custom_script = ? WHERE user_id = ?',
      [enable_login_google, google_client_id, google_client_secret, google_callback_url, custom_script, userId]
    );
  },

  deleteSettings: async (userId) => {
    await db.query('DELETE FROM google_settings WHERE user_id = ?', [userId]);
  }
};

module.exports = GoogleSettings;
