const express = require('express');
// Import necessary controllers and middleware
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
const aiPlatformController = require('../controllers/Platform/aiPlatformController');
const checkAuth = require('../middleware/authMiddleware');

const router = express.Router();

// Bot Categories Routes
router.post('/botCategories/', checkAuth, botCategoryController.getCategories);
router.post('/botCategories/getAllCategories', checkAuth, botCategoryController.getAllCategories);
router.post('/botCategories/create', checkAuth, botCategoryController.createUpdateCategory);
router.post('/botCategories/delete/:id', checkAuth, botCategoryController.deleteCategory);

// Categories Routes
router.post('/categories/', checkAuth, categoryController.getCategories);
router.post('/categories/getAllCategories', checkAuth, categoryController.getAllCategories);
router.post('/categories/create', checkAuth, categoryController.createUpdateCategory);
router.post('/categories/delete/:id', checkAuth, categoryController.deleteCategory);

// Questions Routes
router.post('/question/', checkAuth, questionController.getQuestions);
router.post('/question/getAllQuestions', checkAuth, questionController.getAllQuestions);
router.post('/question/create', checkAuth, questionController.createQuestion);
router.post('/question/delete/:id', checkAuth, questionController.deleteQuestion);

// Personas Routes
router.post('/personas/', checkAuth, personController.getPersonas);
router.post('/personas/getAllPersonas', checkAuth, personController.getAllPersonas);
router.post('/personas/create', checkAuth, personController.createPersona);
router.post('/personas/delete/:id', checkAuth, personController.deletePersona);

// Prompts Routes
router.post('/prompts/', checkAuth, promptsController.getAllPrompts);
router.post('/prompts/create/', checkAuth, promptsController.createPrompt);
router.post('/prompts/delete/:id', checkAuth, promptsController.deletePrompt);
router.post('/prompts/getAllPersonasCategoriesQuestions', checkAuth, promptsController.getAllPersonasCategoriesQuestions);

// Permissions Routes
router.post('/permission/get', checkAuth, permissionController.getAllPermissions);
router.post('/permission/', checkAuth, permissionController.createPermission);
router.delete('/permission/:id', checkAuth, permissionController.deletePermission);
router.get('/permission/findAllByUserId', checkAuth, permissionController.findAllByUserId);

// Plan Routes
router.post('/plan/', checkAuth, planController.getAllPlan);
router.post('/plan/create', checkAuth, planController.createOrUpdatePlan);
router.post('/plan/delete/:id', checkAuth, planController.deletePlan);

// Role Routes
router.post('/roles/get', checkAuth, roleController.getAllRoles);
router.post('/roles/', checkAuth, roleController.createRole);
router.delete('/roles/:id', checkAuth, roleController.deleteRole);

// User Routes
router.get('/user/updateAffiliate/:id', checkAuth, userController.updateAffiliate);
router.post('/user/getAffiliate', checkAuth, userController.getAffiliate);
router.post('/user/registerAdmin', userController.registerAdmin); 
router.post('/user/registerUser', userController.registerUser); 
router.post('/user/login', userController.login); 
router.post('/user/verifyOtp', userController.verifyOtp); 
router.get('/user/regenerateOtp/:email', userController.regenerateOtp);
router.get('/user/forgotPassword/:email', userController.forgotPassword);
router.post('/user/resetPassword', userController.resetPassword);
router.get('/user', userController.getAllUsers);

// Location Routes
router.get('/locations/countries', locationController.getCountries);
router.get('/locations/states/:countryCode', locationController.getStates);
router.get('/locations/cities/:countryCode/:stateCode', locationController.getCities);
router.get('/locations/currencies', locationController.getAllCurrencies);
router.get('/locations/languages', locationController.getLanguages);

// Branding Routes
router.post('/branding', checkAuth, brandingController.updateBranding);
router.get('/branding', checkAuth, brandingController.getBranding);
router.post('/branding/colors', checkAuth, brandingController.updateColor);
router.get('/branding/colors', brandingController.getColors);

// Platform Routes
router.get('/platform/getUserCategories', platformController.getUserCategories);
router.get('/platform/getPrompts/:id', platformController.getPrompts);
router.post('/platform/generateImage', aiPlatformController.generateImage);

module.exports = router;
