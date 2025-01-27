const axios = require('axios');
const crypto = require('crypto');

const model = "sdxl";

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

async function handleImage(prompt) {
  try {
    const { signature, timestamp } = generateSignature();
    const { data } = await axios.post('https://api.startnest.uk/api/image-generator', {
      prompt: `Realism style of ${prompt} High quality, gorgeous, glamorous, super detail, gorgeous light and shadow, detailed decoration, detailed lines`,
      responseFormat: "b64",
      seed: timestamp,
      size: {
        height: 1024,
        width: 1024
      }
    }, {
      headers: {
        "app_name": "AIKEYBOARD",
        "Authorization": signature
      }
    });
    
    return Buffer.from(data.data, 'base64');
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  model,
  handleImage
};
