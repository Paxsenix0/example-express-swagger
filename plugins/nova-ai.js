const axios = require('axios');

const model = 'nova-ai';

function getStaticDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

async function handleMessage(body) {
  try {
    const date = getStaticDate();
    const prompt = body[body.length - 1].content;

    const transformedJson = {
      question_text: prompt,
      conversation: {
        conversation_items: body.length > 1
          ? body.reduce((acc, curr, index, array) => {
              if (curr.role === "user" && array[index + 1]?.role === "assistant") {
                acc.push({
                  date: date,
                  user_model: { text: curr.content },
                  ai_model: { text: array[index + 1].content },
                });
              }
              return acc;
            }, [])
          : [],
      },
    };

    const { data } = await axios.post(
      'https://us-central1-nova-ai---android.cloudfunctions.net/app/ai-response/v2',
      transformedJson,
      {
        headers: {
          platform: "Android",
          version: "1.3.2",
          language: "en",
        },
      }
    );

    return data.text.trim();
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  model,
  handleMessage
};
