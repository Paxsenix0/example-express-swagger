const axios = require('axios');

const model = 'gemini-1.5-flash-8b';
const apiKey = 'AIzaSyAMyo2xOeO05IcB87sonXcAkLVoVmlGbWE';

const convertOpenAiToGemini = (openAiRequest) => {
  const systemMessages = openAiRequest.messages.filter(message => message.role === "system");
  const otherMessages = openAiRequest.messages.filter(message => message.role !== "system");
  const geminiRequest = {
      contents: otherMessages.messages.map((message) => ({
          role: message.role === "assistant" ? "model" : message.role,
          parts: [
              {
                  text: message.content
              }
          ]
      }))
  };
  if (systemMessages) {
      
  }
  return geminiRequest;
};

async function handleMessage(body) {
  try {
    const requestJsonOpenAI = {
      messages: body
    };

    const requestJson = convertOpenAiToGemini(requestJsonOpenAI);

    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1alpha/models/${model}:generateContent?key=${apiKey}`,
      requestJson,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return data.candidates[0].content.parts[0].text.trim();
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  model,
  handleMessage
};