const axios = require('axios');

const model = 'gpt-4o-mini';
const apiKey = '';

async function handleMessage(body) {
  try {
    const requestJson = {
      model,
      messages: body.messages
    };

    const { data } = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestJson,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      }
    );

    return data.choices[0].message.content.trim();
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  model,
  handleMessage
};