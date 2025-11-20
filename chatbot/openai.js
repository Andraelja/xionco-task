const axios = require("axios");

async function openaiChat(message) {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3.2",
      prompt: `Kamu adalah chatbot toko. ${message}`,
      stream: false
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.response;
}

module.exports = openaiChat;
