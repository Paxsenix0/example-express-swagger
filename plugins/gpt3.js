const axios = require('axios');
const crypto = require('crypto');

const model = 'gpt-3.5-turbo';

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

async function handleMessage(body) {
  try {
    const { signature } = generateSignature();
    const requestJson = {
      model,
      messages: body
    };

    const { data } = await axios.post(
      'https://api.startnest.uk/api/completions/v1',
      requestJson,
      {
        headers: {
          "app_name": "AIKEYBOARD",
          "Authorization": signature
        }
      }
    );

    return data.data.choices[0].message.content.trim();
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  model,
  handleMessage
};