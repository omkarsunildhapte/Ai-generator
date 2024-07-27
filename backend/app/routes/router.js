const express = require('express');
const categoryController = require('../controllers/Promote/categoryController');
const botCategoryController = require('../controllers/Promote/botCategoryController');
const personController = require('../controllers/Promote/personController');
const questionController = require('../controllers/Promote/questionController');
const permissionController = require('../controllers/USER/permissionController');
const planController = require('../controllers/USER/planController');
const roleController = require('../controllers/USER/roleController');
const userController = require('../controllers/USER/userController');
const locationController = require('../controllers/locationController');
const brandingController = require('../controllers/USER/brandingController');
const promptsController = require('../controllers/Promote/promptsController');
const platformController = require('../controllers/Platform/platformController');
const promoteSettingsController = require('../controllers/Promote/promoteSettingsController');
const aiPlatformController = require('../controllers/Platform/aiPlatformController');
const checkAuth = require('../middleware/authMiddleware');
const router = express.Router();

// Bot Categories Routes
router.post('/botCategories/', checkAuth(49), botCategoryController.getCategories);
router.post('/botCategories/getAllCategories', checkAuth(49), botCategoryController.getAllCategories);
router.post('/botCategories/create', checkAuth(48), botCategoryController.createUpdateCategory);
router.post('/botCategories/delete/:id', checkAuth(48), botCategoryController.deleteCategory);

// Categories Routes
router.post('/categories/', checkAuth(21), categoryController.getCategories);
router.post('/categories/getAllCategories', checkAuth(21), categoryController.getAllCategories);
router.post('/categories/create', checkAuth(20), categoryController.createUpdateCategory);
router.post('/categories/delete/:id', checkAuth(20), categoryController.deleteCategory);

// Questions Routes
router.post('/question/', checkAuth(25), questionController.getQuestions);
router.post('/question/getAllQuestions', checkAuth(25), questionController.getAllQuestions);
router.post('/question/create', checkAuth(24), questionController.createQuestion);
router.post('/question/delete/:id', checkAuth(24), questionController.deleteQuestion);

// Personas Routes
router.post('/personas/', checkAuth(29), personController.getPersonas);
router.post('/personas/getAllPersonas', checkAuth(29), personController.getAllPersonas);
router.post('/personas/create', checkAuth(28), personController.createPersona);
router.post('/personas/delete/:id', checkAuth(28), personController.deletePersona);

// Prompts Routes
router.post('/prompts/', checkAuth(33), promptsController.getAllPrompts);
router.post('/prompts/create/', checkAuth(32), promptsController.createPrompt);
router.post('/prompts/delete/:id', checkAuth(32), promptsController.deletePrompt);
router.post('/prompts/getAllPersonasCategoriesQuestions', checkAuth(33), promptsController.getAllPersonasCategoriesQuestions);
router.get('/promptsSettings/getPromptsSettings', checkAuth(32), promoteSettingsController.getPromptsSettings);
router.post('/promptsSettings/createOrUpdateSetting', checkAuth(32), promoteSettingsController.createOrUpdateSetting);

// Permissions Routes
router.post('/permission/get', checkAuth(1), permissionController.getAllPermissions);
router.post('/permission/', checkAuth(2), permissionController.createPermission);
router.delete('/permission/:id', checkAuth(3), permissionController.deletePermission);
router.get('/permission/findAllByUserId', checkAuth(4), permissionController.findAllByUserId);

// Plan Routes
router.post('/plan/', checkAuth(5), planController.getAllPlan);
router.post('/plan/create', checkAuth(6), planController.createOrUpdatePlan);
router.post('/plan/delete/:id', checkAuth(7), planController.deletePlan);

// Role Routes
router.post('/roles/get', checkAuth(8), roleController.getAllRoles);
router.post('/roles/', checkAuth(9), roleController.createRole);
router.delete('/roles/:id', checkAuth(10), roleController.deleteRole);

// User Routes
router.get('/user/updateAffiliate/:id', checkAuth(11), userController.updateAffiliate);
router.post('/user/getAffiliate', checkAuth(12), userController.getAffiliate);
router.post('/user/registerAdmin', userController.registerAdmin); 
router.post('/user/registerUser', userController.registerUser); 
router.post('/user/login', userController.login); 
router.post('/user/verifyOtp', userController.verifyOtp); 
router.get('/user/regenerateOtp/:email', userController.regenerateOtp);
router.get('/user/forgotPassword/:email', userController.forgotPassword);
router.post('/user/resetPassword', userController.resetPassword);
router.get('/user', checkAuth(13), userController.getAllUsers);

// Location Routes
router.get('/locations/countries', locationController.getCountries);
router.get('/locations/states/:countryCode', locationController.getStates);
router.get('/locations/cities/:countryCode/:stateCode', locationController.getCities);
router.get('/locations/currencies', locationController.getAllCurrencies);
router.get('/locations/languages', locationController.getLanguages);

// Branding Routes
router.post('/branding', checkAuth(14), brandingController.updateBranding);
router.get('/branding', checkAuth(15), brandingController.getBranding);
router.post('/branding/colors', checkAuth(16), brandingController.updateColor);
router.get('/branding/colors', brandingController.getColors);

// Platform Routes
router.get('/platform/getUserCategories', platformController.getUserCategories);
router.get('/platform/getPrompts/:id', platformController.getPrompts);
router.get('/platform/getDefaultUpdatePlan', platformController.getDefaultUpdatePlan);
// router.post('/platform/generateImage', aiPlatformController.generateImage);

module.exports = router;
