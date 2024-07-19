const User = require('../models/USER/userModel');

const checkAuth = async (req, res, next) => {
  const userId = parseInt(req.query.userId);
  const tenantId = parseInt(req.query.tenantId);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token || token === 'null') {
    return res.status(401).json({ status: 401, error: 'Unauthorized: Missing token', res: null });
  }

  try {
    let user = await User.findOut(userId, tenantId);
    console.log('userId',userId,)
    console.log('tenantId',tenantId,)
    console.log('user',user,)
    if (!user || user.length === 0) {
      return res.status(401).json({ status: 401, error: 'User not found', res: null });
    }

    const userData = user[0];

    if (userData.account_status !== 1) {
      return res.status(401).json({ status: 401, error: 'User is not active', res: null });
    }

    if (userData.delete_status === 1) {
      return res.status(401).json({ status: 401, error: 'User does not exist', res: null });
    }

    const tokenExpiry = new Date(userData.token_expiry);
    const currentTime = new Date();

    if (currentTime > tokenExpiry) {
      return res.status(401).json({ status: 401, error: 'Unauthorized: Token expired', res: null });
    }
    req.userData = userData;
    next();
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Internal server error', res: null });
  }
};

module.exports = checkAuth;
