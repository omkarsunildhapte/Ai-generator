const db = require('../../../db/config');
const bcrypt = require('bcrypt');

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },

  register: async (userData) => {
    const { name, surname, email, password, phone_number, locationName, address, county, state, city, zipcode, tenant_id, affiliate } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(`INSERT INTO users (name, surname, email, phone_number, account_status, password, locationName, address, state, city, zipcode, county, tenant_id, affiliate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, surname, email, phone_number, 1, hashedPassword, locationName, address, state, city, zipcode, county, tenant_id, affiliate]);
  },

  updateOtp: async (id, tenantId, otp, otpExpiry) => {
    await db.query("UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ? AND tenant_id = ?", [otp, otpExpiry, id, tenantId]);
  },

  clearOtp: async (id, tenantId) => {
    await db.query("UPDATE users SET otp = NULL, otp_expiry = NULL WHERE id = ? AND tenant_id = ?", [id, tenantId]);
  },

  updateToken: async (userId, token, tokenExpiry) => {
    await db.query("UPDATE users SET token = ?, token_expiry = ? WHERE id = ?", [token, tokenExpiry, userId]);
  },

  verifyOtp: async (email, otp) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND otp = ? AND otp_expiry > NOW()", [email, otp]);
    return rows[0];
  },

  updatePassword: async (id, tenantId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ? AND tenant_id = ?", [hashedPassword, id, tenantId]);
  },

  // Affiliate 

  updateAffiliate: async (id, affiliate) => {
    await db.query("UPDATE users SET affiliate = ? WHERE id = ?", [affiliate, id]);
  },

  getAffiliate: async (userId, tenantId) => {
    const [rows] = await db.query('SELECT affiliate FROM users WHERE id = ? AND tenant_id = ?', [userId, tenantId]);
    return rows.length > 0 ? rows[0] : null;
  },

  create: async (userData) => {
    const { name, surname, email, phoneNumber, account_status, password, locationName, address, state, city, zipcode, county, tenant_id, affiliate } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, surname, email, phone_number, account_status, password, locationName, address, state, city, zipcode, county, tenant_id, affiliate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, surname, email, phoneNumber, account_status, hashedPassword, locationName, address, state, city, zipcode, county, tenant_id, affiliate]);
  },

  get: async ({ userId, page = 1, limit = 10, sort, search }) => {
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    let query = `
        SELECT u.id, u.name, u.email, u.surname, u.phone_number,u.account_status,u.created_by,u.created_at,u.updated_at,roles
        FROM users u LEFT JOIN user_roles_permission urp ON u.id = urp.id LEFT JOIN roles r ON JSON_CONTAINS(urp.roles, JSON_QUOTE(CAST(r.id AS CHAR)))
        WHERE u.tenant_id = ? AND u.delete_status = 0`;
    const queryParams = [userId];

    if (search) {
      query += " AND (u.name LIKE ? OR u.email LIKE ?)";
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    query += " GROUP BY u.id";

    if (sort) {
      const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
      const sortBy = sort.replace(/^-/, "");
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    } else {
      query += " ORDER BY u.created_at DESC";
    }

    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    const [users] = await db.query(query, queryParams);

    const [totalCountResult] = await db.query("SELECT COUNT(*) AS count FROM users WHERE tenant_id = ? AND delete_status = 0",[userId]);
    const totalCount = totalCountResult[0].count;

    return { users, total: totalCount, page, totalPages: Math.ceil(totalCount / limit) };
  },
  updateEmailVerify: async (data) => {
    const { userId, newEmail, token, tenantId } = data;
    await db.query("UPDATE users SET new_email = ?, email_verification_token = ?, email_token_expiry = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id = ? AND tenant_id = ?", [newEmail, token, userId, tenantId]);
  },

  verifyEmailToken: async (token) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email_verification_token = ? AND email_token_expiry > NOW()", [token]);
    if (rows.length > 0) {
      const user = rows[0];
      await db.query("UPDATE users SET email = new_email, new_email = NULL, email_verification_token = NULL, email_token_expiry = NULL WHERE id = ?", [user.id]);
      return user;
    } else {
      return null;
    }
  },

  updateEmail: async (userId, newEmail, tenantId) => {
    await db.query("UPDATE users SET email = ? WHERE id = ? AND tenant_id = ?", [newEmail, userId, tenantId]);
  },

  updateStatus: async (id, tenantId, activeStatus) => {
    await db.query("UPDATE users SET account_status = ? WHERE id = ? AND tenant_id = ?", [activeStatus, id, tenantId]);
  },

  delete: async (id, tenantId) => {
    await db.query("UPDATE users SET delete_status = 1 WHERE id = ? AND tenant_id = ?", [id, tenantId]);
  },

  update: async (id, userData) => {
    const { firstName, lastName, email, phoneNumber, activeStatus } = userData;
    await db.query("UPDATE users SET name = ?, surname = ?, email = ?, phone_number = ?, account_status = ? WHERE id = ?", [firstName, lastName, email, phoneNumber, activeStatus, id]);
  },

  findOut: async (id, tenantId) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ? AND tenant_id = ?", [id, tenantId]);
    return rows[0];
  }
};

module.exports = User;
