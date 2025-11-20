const express = require("express");
const router = express.Router();
const openaiChat = require("../chatbot/openai");

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message wajib diisi" });
  }

  try {
    const reply = await openaiChat(message);
    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: "ChatGPT gagal memproses",
      details: error.response ? error.response.data : error.message
    });
  }
});

module.exports = router;
