const User = require('../models/USER/userModel');
const UserRolesPermission = require('../models/USER/user_roles_permissionModel');

const checkAuth = (permissionId) =>  async (req, res, next) => {
  const userId = parseInt(req.query.userId, 10);
  const tenantId = parseInt(req.query.tenantId, 10);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ status: 401, error: 'Unauthorized: Missing token', res: null });
  }
  try {
    let user = await User.findOut(userId, tenantId);
    if (!user) {
      return res.status(401).json({ status: 401, error: 'User not found', res: null });
    }
    if (user.account_status !== 1) {
      return res.status(401).json({ status: 401, error: 'User is not active', res: null });
    }

    if (user.delete_status === 1) {
      return res.status(401).json({ status: 401, error: 'User does not exist', res: null });
    }
    const tokenExpiry = new Date(user.token_expiry);
    const currentTime = new Date();

    if (isNaN(tokenExpiry.getTime()) || currentTime > tokenExpiry) {
      return res.status(401).json({ status: 401, error: 'Unauthorized: Token expired', res: null });
    }
    const userPermissions = await UserRolesPermission.find(user.id);
    const allPermissions = userPermissions.roles.flatMap(role => JSON.parse(role.permissions));
    const uniquePermissions = [...new Set(allPermissions)];
    // if (uniquePermissions.length || uniquePermissions.find(permissionId)) {
    //   return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    // }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error); 
    res.status(500).json({ status: 500, error: 'Internal server error', res: null });
  }
};

module.exports = checkAuth;
