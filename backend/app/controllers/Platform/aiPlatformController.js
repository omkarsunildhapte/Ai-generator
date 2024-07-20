const OpenAI = require('openai');
require("dotenv").config();

const openai = new OpenAI({ apiKey: 'My API Key' });
const generateImage = async (req, res) => {
  const { question, noOfImages, imageSize, style } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${question}${style ? ` in ${style} style` : ''}`,
      n: noOfImages || 1,
      size: imageSize || "1024x1024",
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateImage,
};
