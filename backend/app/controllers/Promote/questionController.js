const Question = require('../../models/Promote/questionModel');

const questionController = {
  getQuestions: async (req, res) => {
    const userId = parseInt(req.query.userId);
    let { page = 1, limit = 10, sort, search,required,type } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    try {
      const questions = await Question.get({ page, limit, sort, search,required,type},userId);
      res.status(200).json({ status: 200, res:questions,error:null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message,res:null });
    }
  },
  getAllQuestions: async (req, res) => {
    const userId = parseInt(req.query.userId);
    try {
      const questions = await Question.getAll(userId);
      res.status(200).json({ status: 200, res: questions, error: null });
    }
    catch (error) {
      res.status(500).json({ status: 500, error: error.message,res:null });
    }
  },

  createQuestion: async (req, res) => {
    const { question_text, type, required, answer_length,options,id} = req.body;
    const user_id = parseInt(req.query.userId);
    try {
      if(id){
        await Question.update(id, { question_text, type, required, answer_length,options},user_id);
        res.status(201).json({ status: 201, res:null,error:null });
      } else{
        await Question.create({ question_text, type, required, answer_length,options},user_id);
        res.status(201).json({ status: 201, res:null,error:null});
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message,res:null });
    }
  },

  deleteQuestion: async (req, res) => {
    const { id } = req.params;
    try {
      await Question.delete(id);
      res.status(200).json({ status: 200, res:null,error:null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message,res:null });
    }
  }
};

module.exports = questionController;
