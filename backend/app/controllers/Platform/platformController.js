const Platform = require("../../models/Platform/platformModel");
const Plan = require("../../models/USER/planModel");
const User = require("../../models/USER/userModel");
const { resetPassword } = require("../USER/userController");

const platformController = {
    getUserCategories: async (req, res) => {
        try {
            const tenantId = parseInt(req.query.tenantId);
            const categories = await Platform.getUserCategories(tenantId);
            if (categories.length === 0) {
                return res.status(404).json({ res: null, error: 'No categories found for the user', status: 404 });
            }
            const categoryIds = categories.map(category => category.id);
            const categoriesString = categoryIds.join(',');
            const prompts = await Platform.getPromptsWithActiveCategories(tenantId, categoriesString);
            const categoriesWithPrompts = categories.map(category => ({ id: category.id, name: category.name, categoryCount: prompts.filter(prompt => prompt.category === (category.id).toString()).length, categoryPrompts: prompts.filter(prompt => prompt.category === (category.id).toString()).map(prompt => ({ name: prompt.name, description: prompt.description, id: prompt.id })) })).filter(e => e.categoryPrompts.length > 0);
            res.status(200).json({ res: categoriesWithPrompts, error: null, status: 200 });
        } catch (error) {
            res.status(500).json({ res: null, error: 'Failed to fetch user categories and prompts', status: 500 });
        }
    },
    getPrompts: async (req, res) => {
        try {
            const tenantId = parseInt(req.query.tenantId);
            const prompts = parseInt(req.params.id);
            let promptsResult = await Platform.getPromptsUser(tenantId, prompts);
            const questions = await Platform.getQuestionsByIds(promptsResult.question_list);
            promptsResult.question_list = questions
            res.status(200).json({ res: promptsResult, error: null, status: 200 });
        } catch (error) {
            res.status(500).json({ res: null, error: error.message, status: 500 });
        }
    },
    getDefaultUpdatePlan: async (req, res) => {
        try {
            const tenantId = parseInt(req.query.tenantId);
            const userId = parseInt(req.query.userId);
            const default_planData = await Plan.getDefaultPlan(tenantId);
            if (!default_planData) {
                return res.status(404).json({ res: null, error: "Default plan not found", status: 404 });
            }
            const { word_limit, image_limit, seats_limit } = default_planData;
            const planData = { default_plan: 1, image_limit, seats_limit, word_limit, plan_id: default_planData.id };
            await User.updatePlan(userId, planData, tenantId);
            const updateData = { default_plan: 1, image_limit, seats_limit, word_limit, plan_id: default_planData.id };
            res.status(200).json({ res: updateData, error: null, status: 200 });
        } catch (error) {
            res.status(500).json({ res: null, error: error.message, status: 500 });
        }
    },
    getPlatformPrimePlans: async (req, res) => {
        try {
            const tenantId = parseInt(req.query.tenantId);
            const planData = await Plan.getPrimePlans(tenantId);
            res.status(200).json({ res: planData, error: null, status: 200 });
        } catch (error) {
            res.status(500).json({ res: null, error: error.message, status: 500 });
        }
    },
    createPlatformPlanHistroy: async (req, res) => {
        try {
            const tenantId = parseInt(req.query.tenantId);
            const userId = parseInt(req.query.userId);
            const { plan_id, expiry_date, amount, currency, status, image_limit, seats_limit, word_limit } = req.body;
            await Plan.createPlanHistroy(userId, tenantId, { plan_id, expiry_date, amount, currency, status });
            const planData = { default_plan: plan_id, image_limit, seats_limit, word_limit, plan_id: plan_id };
            console.log(planData)
            await User.updatePlan(userId, planData, tenantId);
            res.status(200).json({ res: null, error: null, status: 200 });
        } catch (error) {
            res.status(500).json({ res: null, error: error.message, status: 500 });
        }
    },
    getAllPlanHistroy: async (req, res) => {
        try {
            let { page = 1, limit = 10, sort } = req.query;
            const tenantId = parseInt(req.query.tenantId);
            const user_id = parseInt(req.query.userId);
            const plans = await Plan.getPlanHistory(user_id, tenantId, { page, limit, sort });
            res.status(200).json({ status: 200, res: plans, error: null });
        } catch (error) {
            res.status(500).json({ status: 500, res: null, error: error.message });
        }
    },
    resetUpdateUser: async (req, res) => {
        try {
            const userId = parseInt(req.query.userId);
            const tenantId = parseInt(req.query.tenantId);
            const { email, firstName, lastName, phoneNumber, activeStatus } = req.body;
            await User.update(userId, { firstName, lastName, email, phoneNumber, activeStatus }, tenantId)
            res.status(200).json({ res: { message: 'Data updated successfully' }, status: 200, error: null });
        } catch (error) {
            res.status(500).json({ status: 500, res: null, error: error.message });
        }
    },
    resetUpdatePassword: async (req, res) => {
        try {
            const userId = parseInt(req.query.userId);
            const tenantId = parseInt(req.query.tenantId);
            const { newPassword } = req.params;
            if (!newPassword) {
                return res.status(400).json({ status: 400, res: null, error: 'Missing required parameters.' });
            }
            await User.updatePassword(userId, tenantId, newPassword);
            res.status(200).json({ res: { message: 'Password updated successfully' }, status: 200, error: null });
        } catch (error) {
            res.status(500).json({ status: 500, res: null, error: error.message });
        }
    },
    updateDefaultLanguage: async (req, res) => {
        try {
            const userId = parseInt(req.query.userId);
            const tenantId = parseInt(req.query.tenantId);
            const { languages_code } = req.params;
            console.log(req.params)
            if (!languages_code) {
                return res.status(400).json({ status: 400, res: null, error: 'Missing required parameters.' });
            }
            await User.updateDefaultLanguage(userId,languages_code,tenantId);
            res.status(200).json({ res: { message: 'Languges updated successfully' }, status: 200, error: null });
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ status: 500, res: null, error: error.message });
        }
    },
};

module.exports = platformController;
