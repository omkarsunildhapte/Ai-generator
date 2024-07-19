const express = require('express');
// const logRequest = require('../middleware/loggingMiddleware');
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

// bot actions in the admin
router.post('/botCategories/', checkAuth, botCategoryController.getCategories);
router.post('/botCategories/getAllCategories', checkAuth, botCategoryController.getAllCategories);
router.post('/botCategories/create', checkAuth, botCategoryController.createUpdateCategory);
router.post('/botCategories/delete/:id', checkAuth, botCategoryController.deleteCategory);

// category actions in the admin
router.post('/categories/', checkAuth, categoryController.getCategories);
router.post('/categories/getAllCategories', checkAuth, categoryController.getAllCategories);
router.post('/categories/create', checkAuth, categoryController.createUpdateCategory);
router.post('/categories/delete/:id', checkAuth, categoryController.deleteCategory);

// question actions in the admin
router.post('/question/', checkAuth, questionController.getQuestions);
router.post('/question/getAllQuestions', checkAuth, questionController.getAllQuestions);
router.post('/question/create', checkAuth, questionController.createQuestion);
router.post('/question/delete/:id', checkAuth, questionController.deleteQuestion);

// persona actions in the admin
router.post('/personas/', checkAuth, personController.getPersonas);
router.post('/personas/getAllPersonas', checkAuth, personController.getAllPersonas);
router.post('/personas/create', checkAuth, personController.createPersona);
router.post('/personas/delete/:id', checkAuth, personController.deletePersona);

// prompts actions in the admin
router.post('/prompts/', checkAuth, promptsController.getAllPrompts);
router.post('/prompts/create/', checkAuth, promptsController.createPrompt);
router.post('/prompts/delete/:id', checkAuth, promptsController.deletePrompt);
router.post('/prompts/getAllPersonasCategoriesQuestions', checkAuth, promptsController.getAllPersonasCategoriesQuestions);

// permission actions in the admin
router.post('/permission/get', checkAuth, permissionController.getAllPermissions);
router.get('/permission/findAllByUserId', checkAuth, permissionController.findAllByUserId);
router.post('/permission/', checkAuth, permissionController.createPermission);
router.delete('/permission/:id', checkAuth, permissionController.deletePermission);

router.post('/plan/', checkAuth, planController.getAllPlan);
router.post('/plan/create', checkAuth, planController.createOrUpdatePlan);
router.post('/plan/delete/:id', checkAuth, planController.deletePlan);

router.post('/roles/get', checkAuth, roleController.getAllRoles);
router.post('/roles/', checkAuth, roleController.createRole);
router.get('/roles/findAllByUserId', checkAuth, roleController.findAllByUserId);
router.delete('/roles/:id', checkAuth, roleController.deleteRole);

router.post('/user/create', checkAuth, userController.createNewUser);
router.get('/user/exists/:email', checkAuth, userController.checkUserExists);
router.get('/user', checkAuth, userController.getAllUsers);
router.post('/user/update-email', checkAuth, userController.updateEmail);
router.post('/user/update-password', checkAuth, userController.updatePassword);
router.put('/user/deactivate', checkAuth, userController.deactivateUser);
router.put('/user/delete', checkAuth, userController.delete);
router.post('/user/openAiKeySettingsUpdate', checkAuth, userController.openAiKeySettingsUpdate);
router.post('/user/bingSeachKeySettings', checkAuth, userController.bingSeachKeySettingsUpdate);
router.post('/user/chatSettingsUpdate', checkAuth, userController.chatSettingsUpdate);
router.post('/user/getSettings', checkAuth, userController.getSettings);
router.get('/user/updateAffiliate/:id', checkAuth, userController.updateAffiliate);
router.post('/user/getAffiliate', checkAuth, userController.getAffiliate);
router.post('/user/register', userController.register); 
router.post('/user/login', userController.login); 
router.post('/user/verifyOtp', userController.verifyOtp); 
router.get('/user/regenerateOtp/:email', userController.regenerateOtp);
router.get('/user/forgotPassword/:email', userController.forgotPassword);
router.post('/user/resetPassword', userController.resetPassword);
router.post('/user/updateGoogleSettings', checkAuth, userController.updateGoogleSettings);
router.post('/user/getGoogleSettings', checkAuth, userController.getGoogleSettings);
router.put('/:id', checkAuth, userController.updateUser);

router.get('/locations/countries', locationController.getCountries);
router.get('/locations/states/:countryCode', locationController.getStates);
router.get('/locations/cities/:countryCode/:stateCode', locationController.getCities);
router.get('/locations/currencies', locationController.getAllCurrencies);
router.get('/locations/languages', locationController.getLanguages);

router.post('/branding', checkAuth, brandingController.updateBranding);
router.get('/branding', checkAuth, brandingController.getBranding);
router.post('/branding/colors', checkAuth, brandingController.updateColor);
router.get('/branding/colors', brandingController.getColors);

router.get('/platform/getUserCategories', platformController.getUserCategories);
router.get('/platform/getPrompts/:id', platformController.getPrompts);
router.post('/platform/generateImage', aiPlatformController.generateImage);

module.exports = router;
