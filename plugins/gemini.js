const axios = require('axios');

const model = 'gemini-1.5-flash-8b';
const apiKey = 'AIzaSyAMyo2xOeO05IcB87sonXcAkLVoVmlGbWE';

const convertOpenAiToGemini = (openAiRequest) => {
  const systemMessages = openAiRequest.messages.filter(message => message.role === "system");
  const otherMessages = openAiRequest.messages.filter(message => message.role !== "system");
  let geminiRequest = {
      contents: otherMessages.messages.map((message) => ({
          role: message.role === "assistant" ? "model" : message.role,
          parts: [
              {
                  text: message.content
              }
          ]
      })),
      safetySettings: [
          {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE"
          },
          {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_NONE"
          },
          {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE"
          },
          {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE"
          }
      ]
  };
  if (systemMessages) {
      geminiRequest = {
          ...geminiRequest,
          system_instruction: {
             parts: {
                text: systemMessages[0].content
             }
          }
      };
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