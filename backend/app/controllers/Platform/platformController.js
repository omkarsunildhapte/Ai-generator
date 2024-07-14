const Platform = require("../../models/Platform/platformModel");

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
            const categoriesWithPrompts = categories.map(category => ({
                id: category.id,
                name: category.name,
                categoryCount: prompts.filter(prompt => prompt.category === (category.id).toString()).length,
                categoryPrompts: prompts.filter(prompt => prompt.category === (category.id).toString()).
                    map(prompt => ({ name: prompt.name, description: prompt.description, id: prompt.id }))
            })).filter(e => e.categoryPrompts.length > 0);
            res.status(200).json({ res: categoriesWithPrompts, error: null, status: 200 });
        } catch (error) {
            res.status(500).json({ res: null, error: 'Failed to fetch user categories and prompts', status: 500 });
        }
    },
    getPrompts: async (req, res) => {
        try {
            const tenantId = parseInt(req.query.tenantId);
            const prompts = parseInt(req.params.id);
            let promptsResult =  await Platform.getPromptsUser(tenantId, prompts);
            const questions = await Platform.getQuestionsByIds(promptsResult.question_list);
            promptsResult.question_list =questions
            res.status(200).json({ res: promptsResult, error: null, status: 200 });
        } catch (error) {
            res.status(500).json({ res: null, error: error.message, status: 500 });
        }
    }
};

module.exports = platformController;
