const crypto = require('crypto');
const User = require('../../models/USER/userModel');
const Role = require('../../models/USER/rolesModel');
const Brand = require('../../models/brandingModel');
const bcrypt = require('bcrypt');
const { updatePassword, sendEmailVerification, sendOtp } = require('../../services/emailService');
const { generateOtp, generateRandomPassword, generateToken } = require('../../services/otpService');

const userController = {
  // login and register 

  register: async (req, res) => {
    const { name, surname, email, password, phone_number, locationName, address, county, state, city, zipcode } = req.body;
    const tenant_id = 1;
    const affiliate = generateRandomPassword();
    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists', status: 400, res: null });
      }
      await User.register({ name, surname, email, password, phone_number, locationName, address, county, state, city, zipcode, tenant_id, affiliate });
      const resp = {
        message: 'Registration Successfully'
      };
      res.status(201).json({ error: null, res: resp, status: 201 });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials', status: 401, res: null });
      }
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await User.updateOtp(user.id,user.tenant_id,otp, otpExpiry);
      const brand = await Brand.getBranding(user.tenant_id);
      await sendOtp(user, otp, brand);
      const resp = {
        message: 'OTP sent to email for login'
      }
      res.status(200).json({ res: resp, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;
    try {
      const user = await User.verifyOtp(email, otp);
      if (!user) {
        return res.status(200).json({res: null,status: 400,error: 'Otp is Expiry and Invalid'});
      }
      const token = generateToken();
      const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await User.clearOtp(user.id,user.tenant_id);
      await User.updateToken(user.id, token, tokenExpiry);
      const brand = await Brand.getBranding(user.id)
      if (!brand) {
        await Brand.createBranding(user.id);
      }
      const updatedUser = await User.findByEmail(email);
      const response = {
        message: 'OTP verified successfully',
        data: {
          name: updatedUser.name,
          email: updatedUser.email,
          phone_number: updatedUser.phone_number,
          locationName: updatedUser.locationName,
          address: updatedUser.address,
          state: updatedUser.state,
          city: updatedUser.city,
          zipcode: updatedUser.zipcode,
          county: updatedUser.county,
          id: updatedUser.id,
          tenantId: updatedUser.tenant_id
        },
        token: updatedUser.token,
      };
      res.status(200).json({ res: response, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  regenerateOtp: async (req, res) => {
    const email = req.params.email;
    try {
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      const user = await User.findByEmail(email);
      await User.updateOtp(user.id,user.tenant_id,otp, otpExpiry);
      const brand = await Brand.getBranding(user.tenant_id);
      await sendOtp(user, otp, brand);
      const resp = {
        message: 'New OTP sent to email'
      };
      res.status(200).json({ res:resp, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  forgotPassword: async (req, res) => {
    const email = req.params.email;
    try {
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      const user = await User.findByEmail(email);
      await User.updateOtp(user.id, user.tenant_id,otp, otpExpiry);
      const brand = await Brand.getBranding(user.tenant_id);
      await sendOtp(user, otp, brand);
      const getVakue = {
        message: 'OTP sent to email for password reset',
      }
      res.status(200).json({ res: getVakue, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  resetPassword: async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
      const user = await User.verifyOtp(email, otp);
      if (!user) {
        return res.status(200).json({res: null,status: 400,error: 'Otp is Expiry and Invalid'});
      }
      await User.updatePassword(user.id,user.tenant_id ,newPassword);
      await User.clearOtp(user.id,user.tenant_id);
      await User.updateToken(user.id, null, null);
      const getVakue = {
        message: 'Password updated successfully',
      }
      res.status(200).json({ res: getVakue, status: 200, error: null });
    } catch (err) {
      res.status(500).json({ error: err.message, status: 500, res: null });
    }
  },

  // Affiliate 

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

  // AI Setting  

  openAiKeySettingsUpdate: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    const { defaultEngine, defaultEngineKey, defaultEngineMaxToken } = req.body;
    try {
      await User.openAiKeySettings(userId, tenantId, defaultEngine, defaultEngineKey, defaultEngineMaxToken);
      res.status(200).json({ status: 200, res: null, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  bingSeachKeySettingsUpdate: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    const { bingSearchKey, bingSearchStatus } = req.body;
    try {
      const status = bingSearchStatus == true ? 1 : 0;
      await User.bingSeachKeySettings(userId, tenantId, bingSearchKey, status);
      res.status(200).json({ status: 200, res: null, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  chatSettingsUpdate: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    const { chatModel, chatModelPersona } = req.body;
    try {
      await User.chatSettings(userId, tenantId, chatModel, chatModelPersona);
      res.status(200).json({ status: 200, res: null, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  getSettings: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    try {
      const settings = await User.getSettings(userId, tenantId);
      res.status(200).json({ status: 200, res: settings, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  //Google Settings
  updateGoogleSettings: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    const { enable_login_google, google_client_id, google_client_secret, google_callback_url, custom_script } = req.body;
    try {
      await User.updateGoogleSettings(userId, tenantId, { enable_login_google, google_client_id, google_client_secret, google_callback_url, custom_script });
      res.json({ res: null, error: null, status: 200 });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  getGoogleSettings: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    try {
      const settings = await User.getGoogleSettings(userId, tenantId);
      res.json({ res: settings, error: null, status: 200 });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },
  

  checkUserExists: async (req, res) => {
    const email = req.params.email;
    try {
      const user = await User.findByEmail(email);
      if (user) {
        res.status(200).json({ status: 200, res: true, error: null });
      } else {
        res.status(200).json({ status: 200, res: false, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  createNewUser: async (req, res) => {
    const { name, surname, email, phoneNumber, account_status, locationName, password, securepassword, address, state, city, zipcode, country, role, } = req.body;
    const tenant_id = parseInt(req.query.userId);
    try {
      let roles = role;
      if (roles && roles.length > 0) {
        roles = roles.map((e) => e.id);
      }
      let passwordshow = password;
      if (securepassword == true) {
        passwordshow = generateRandomPassword();
      }
      await updatePassword(email, passwordshow);
      let combinedPermissions = new Set();
      for (const roleId of roles) {
        const rolePermissions = await Role.getPermissionsByRoleId(roleId);
        rolePermissions.forEach((permission) => {
          combinedPermissions.add(permission);
        });
      }
      const permission = Array.from(new Set(Array.from(combinedPermissions).flat()));
      await User.create({ name, surname, email, phoneNumber, account_status, passwordshow, locationName, address, state, city, zipcode, country, permission, tenant_id, roles, });
      res.status(201).json({ status: 201, data: null, error: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  getAllUsers: async (req, res) => {
    const tenantId = req.query.tenantId;
    const { page, limit, sort, search } = req.query;
    try {
      const result = await User.get({ tenantId, page, limit, sort, search });
      res.status(200).json({ status: 200, error: null, res: result });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  updateEmail: async (req, res) => {
    const { newEmail, verifyCondition } = req.body;
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    try {
      if (verifyCondition) {
        const verificationToken = crypto.randomBytes(20).toString("hex");
        await User.updateEmailVerify({ userId, newEmail, verificationToken, tenantId });
        await sendEmailVerification(newEmail, verificationToken);
        res.status(200).json({ status: 200, res: null, error: null });
      } else {
        await User.updateEmail(userId, newEmail, tenantId);
        res.status(200).json({ status: 200, res: null, error: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  verifyEmail: async (req, res) => {
    const { token } = req.query;
    try {
      const user = await User.verifyEmailToken(token);
      if (user) {
        res.status(200).json({ status: 200, error: null, res: null });
      } else {
        res.status(400).json({ status: 400, error: "Invalid or expired token", res: null });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  updatePassword: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    const { newPassword, email } = req.body;
    try {
      await User.updatePassword(userId,tenantId ,newPassword);
      await updatePassword(email, newPassword)
      rres.status(200).json({ status: 200, error: null, res: null });
    } catch (err) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  deactivateUser: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    const status = parseInt(req.query.status);
    try {
      await User.updateStatus(userId, tenantId, status);
      res.status(200).json({ status: 200, error: null, res: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  delete: async (req, res) => {
    const userId = parseInt(req.query.userId);
    const tenantId = parseInt(req.query.tenantId);
    try {
      await User.delete(userId, tenantId);
      res.status(200).json({ status: 200, erorr: null, res: null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message, res: null });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, phoneNumber, activeStatus, roles } =
      req.body;
    try {
      await User.update(userId, {
        firstName,
        lastName,
        email,
        phoneNumber,
        activeStatus,
        roles,
      });
      res.status(200).json({
        status: 200,
        message: "User updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};

module.exports = userController;
