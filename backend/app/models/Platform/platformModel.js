const db = require('../../../db/config');

const Platform = {
    getUserCategories: async (userId) => {
            const [categories] = await db.query('SELECT * FROM categories WHERE user_id = ? AND status = 1', [userId]);
            return categories;
    },
    getPromptsWithActiveCategories: async (userId, categoriesString) => {
            const query = `SELECT * FROM prompts WHERE user_id = ? AND status = 1 AND category IN (${categoriesString})`;
            const [prompts] = await db.query(query, [userId]);
            return prompts;
    },
    getPromptsUser :async (userId, id) => {
            const [prompts] = await db.query(`SELECT name,question_list,id,type FROM prompts WHERE user_id = ? AND id = ? `, [userId,id]);
            return prompts[0] ;
    },
    getQuestionsByIds: async (questionIds) => {
        if (questionIds.length === 0) {
            return [];
        }
        const questionIdsString = questionIds.join(',');
        const query = `SELECT id, question_text, options, type,required FROM questions WHERE id IN (${questionIdsString})`;
        const [questions] = await db.query(query);
        return questions.map(q => ({
            id:q.id,
            question_text: q.question_text,
            options: (q.options), 
            type: q.type,
            required:q.required ==1
        }));
    }
};

module.exports = Platform;
