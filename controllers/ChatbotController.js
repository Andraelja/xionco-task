const openaiChat = require("../chatbot/openai");

const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const response = await openaiChat(message);
    res.json({ response });
  } catch (error) {
    console.error("Error in chatbot route:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  chat
};
