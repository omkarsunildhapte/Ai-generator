const crypto = require('crypto');

const generateOtp = () => crypto.randomBytes(3).toString('hex');
const generateRandomPassword = () => {
  const buffer = crypto.randomBytes(12);
  const password = buffer.toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
  return password;
}
const generateToken = (length = 100) => {
  return crypto.randomBytes(length).toString('hex');
};
module.exports = { generateOtp, generateRandomPassword, generateToken };
