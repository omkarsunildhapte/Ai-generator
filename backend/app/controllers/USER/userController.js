const User = require('../../models/USER/userModel');
const Brand = require('../../models/USER/brandingModel');
const Roles = require('../../models/USER/rolesModel');
const UserRolesPermission = require('../../models/USER/user_roles_permissionModel');
const bcrypt = require('bcrypt');
const { sendOtp } = require('../../services/emailService');
const { generateOtp, generateRandomPassword, generateToken } = require('../../services/otpService');

const userController = {
  // Register a new user
  registerUser: async (req, res) => {
    const { name, surname, email, password, phone_number, locationName, address, county, state, city, zipcode } = req.body;
    const tenant_id = 1;
    const affiliate = generateRandomPassword();
    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists', status: 400, res: null });
      }
      await User.register({ name, surname, email, password, phone_number, locationName, address, county, state, city, zipcode, tenant_id, affiliate });
      const user = await User.findByEmail(email);
      const data = await Roles.getRoleId(3);
      const payload = {
        id: user.id,
        roles: [{
          role_id: data.id,
          role_name: data.name,
          permissions: JSON.stringify(data.permissions)
        }]
      }
      await UserRolesPermission.add(payload);
      res.status(201).json({ error: null, res: { message: 'Registration successful' }, status: 201 });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },
  
  // Register a new Admin
  registerAdmin: async (req, res) => {
    const { name, surname, email, password, phone_number, locationName, address, county, state, city, zipcode } = req.body;
    const tenant_id = 1;
    const affiliate = generateRandomPassword();
    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists', status: 400, res: null });
      }
      await User.register({ name, surname, email, password, phone_number, locationName, address, county, state, city, zipcode, tenant_id, affiliate });
      const user = await User.findByEmail(email);
      const roleIds = [2, 3];
      let missingRolesData=[];
      for (const id of roleIds) {
        const data = await Roles.getRoleId(id);
        missingRolesData.push({
          role_id: data.id,
          role_name: data.name,
          permissions:JSON.stringify(data.permissions)
        });
      }
      const roles = missingRolesData;
      await UserRolesPermission.add({id:user.id,roles})
      res.status(201).json({ error: null, res: { message: 'Registration successful' }, status: 201 });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },
  
  // Login user and send OTP
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials', status: 401, res: null });
      }
      if (user.delete_status === 1) {
        return res.status(401).json({ status: 401, error: 'User deleted from the system', res: null });
      }
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await User.updateOtp(user.id, user.tenant_id, otp, otpExpiry);
      const brand = await Brand.getBranding(user.tenant_id);
      await sendOtp(user, otp, brand);
      res.status(200).json({ res: { message: 'OTP sent to email for login' }, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  // Verify OTP
  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;
    try {
      const user = await User.verifyOtp(email, otp);
      if (!user) {
        return res.status(400).json({ res: null, status: 400, error: 'OTP is expired or invalid' });
      }
      const token = generateToken();
      const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await User.clearOtp(user.id, user.tenant_id);
      await User.updateToken(user.id, token, tokenExpiry);
      const brand = await Brand.getBranding(user.tenant_id);
      if (!brand) {
        await Brand.createBranding(user.id);
      }
      const updatedUser = await User.findByEmail(email);
      const data = await UserRolesPermission.find(updatedUser.id);
      res.status(200).json({
        res: {
          message: 'OTP verified successfully',
          data: {
            name: updatedUser.name,
            surname:updatedUser.surname,
            email: updatedUser.email,
            phone_number: updatedUser.phone_number,
            locationName: updatedUser.locationName,
            address: updatedUser.address,
            state: updatedUser.state,
            city: updatedUser.city,
            zipcode: updatedUser.zipcode,
            county: updatedUser.county,
            id: updatedUser.id,
            tenantId: updatedUser.tenant_id,
            role:data.roles.map(e=>e.role_name),
            seat_limit:updatedUser.seat_limit,
            word_limit:updatedUser.word_limit,
            image_limit:updatedUser.image_limit,
            default_plan:updatedUser.default_plan,
            plan_id:updatedUser.plan_id,
            seat_used: updatedUser.seat_used,
            word_used:updatedUser.word_used,
            image_used:updatedUser.image_used,
            default_language:updatedUser.default_language
          },
          token: updatedUser.token
        },
        status: 200,
        error: null
      });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },
  
  // Regenerate OTP
  regenerateOtp: async (req, res) => {
    const email = req.params.email;
    try {
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      const user = await User.findByEmail(email);
      await User.updateOtp(user.id, user.tenant_id, otp, otpExpiry);
      const brand = await Brand.getBranding(user.tenant_id);
      await sendOtp(user, otp, brand);
      res.status(200).json({ res: { message: 'New OTP sent to email' }, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  // Forgot password
  forgotPassword: async (req, res) => {
    const email = req.params.email;
    try {
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      const user = await User.findByEmail(email);
      await User.updateOtp(user.id, user.tenant_id, otp, otpExpiry);
      const brand = await Brand.getBranding(user.tenant_id);
      await sendOtp(user, otp, brand);
      res.status(200).json({ res: { message: 'OTP sent to email for password reset' }, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  // Reset password
  resetPassword: async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
      const user = await User.verifyOtp(email, otp);
      if (!user) {
        return res.status(400).json({ res: null, status: 400, error: 'OTP is expired or invalid' });
      }
      await User.updatePassword(user.id, user.tenant_id, newPassword);
      await User.clearOtp(user.id, user.tenant_id);
      await User.updateToken(user.id, null, null);
      res.status(200).json({ res: { message: 'Password updated successfully' }, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  // Update affiliate
  updateAffiliate: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const affiliate = req.params.id;
    try {
      await User.updateAffiliate(userId, affiliate);
      res.status(200).json({ status: 200, res: null, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  // Get affiliate
  getAffiliate: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    try {
      const user = await User.getAffiliate(userId, tenantId);
      const { affiliate } = user;
      res.status(200).json({ status: 200, res: affiliate, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  // get All Users
  getAllUsers: async (req, res) => {
    const userId = req.query.userId;
    const { page, limit, sort, search } = req.query;
    try {
      const result = await User.get({ userId, page, limit, sort, search });
      res.status(200).json({ status: 200, res: result, error: null });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  }
};

module.exports = userController;
