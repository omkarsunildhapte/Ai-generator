const Question = require('../../models/Promote/questionModel');

const questionController = {
  getQuestions: async (req, res) => {
    const userId = parseInt(req.query.userId);
    let { page, limit, sort, search,required,type } = req.body;
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
    const resMessage = {
      message: id ? 'Question is successfully updated' : 'Question is successfully created'
    };
    try {
      if(id){
        await Question.update(id, { question_text, type, required, answer_length,options},user_id);
        res.status(201).json({ status: 201, res:resMessage,error:null });
      } else{
        await Question.create({ question_text, type, required, answer_length,options},user_id);
        res.status(201).json({ status: 201, res:resMessage,error:null});
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message,res:null });
    }
  },

  deleteQuestion: async (req, res) => {
    const { id } = req.params;
    const resMessage = {
      message: 'Category is successfully deleted'
  };
    try {
      await Question.delete(id);
      res.status(200).json({ status: 200, res:resMessage,error:null });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message,res:null });
    }
  }
};

module.exports = questionController;
