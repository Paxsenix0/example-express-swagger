const axios = require('axios');
const crypto = require('crypto');

const model = 'gpt-4o';

function generateSignature() {
  const epochSecond = Math.floor(Date.now() / 1000);
  const str = "36ccfe00-78fc-4cab-9c5b-5460b0c78513";
  const validity = "90";
  const combined = `${str}${epochSecond}${validity}`;
  const hash = crypto.createHash("sha256").update(combined, "utf8").digest("hex");

  const iVarArr = [
    { key: "kid", value: str },
    { key: "algorithm", value: "sha256" },
    { key: "timestamp", value: String(epochSecond) },
    { key: "validity", value: validity },
    { key: "userId", value: "" },
    { key: "value", value: hash },
  ];

  const signature = iVarArr
    .map((item) => `${item.key}=${encodeURIComponent(item.value)}`)
    .join("&");

  return { signature: `Signature ${signature}`, timestamp: String(epochSecond) };
}

function parseStreamText(streamText) {
  const lines = streamText.split("\n").filter(line => line.startsWith("data:"));
  let result = "";

  for (const line of lines) {
    if (line.includes("[DONE]")) break;

    try {
      const jsonData = JSON.parse(line.substring(5).trim());
      const content = jsonData.choices[0].message.content;
      if (content) result += content;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  return result;
}

async function handleMessage(body) {
  try {
    const { signature } = generateSignature();
    const requestJson = {
        isVip: true,
        max_tokens: 2000,
        messages: body.map(message => ({
           ...message,
           content: [
             {
               "text": message.content,
               "type": "text"
             }
           ]
        })),
        stream: false
    };

    const { data: bct } = await axios.post(
      'https://api.startnest.uk/api/completions/v2/stream',
      requestJson,
      {
        headers: {
          "app_name": "AIKEYBOARD",
          "Authorization": signature,
          'messagerequestwithpromodel': '0',
          'chatmodel': 'gpt_4o',
          'messagerequest': '0',
          'isvip': 'true'
        }
      }
    );

    return parseStreamText(bct).trim();;
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  model,
  handleMessage
};