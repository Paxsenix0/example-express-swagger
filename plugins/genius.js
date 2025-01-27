const axios = require('axios');
const crypto = require('crypto');
const ws = require('ws');

const model = "flux";

async function flux(prompt) {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const connection = new ws("wss://geniusai-backend.e-support.ai/ws", {
        headers: {
           "origin": "https://geniusai-backend.e-support.ai",
           "Upgrade": "websocket",
           "Connection": "Upgrade",
           "Host": "geniusai-backend.e-support.ai",
           "Accept-Encoding": "gzip",
           "User-Agent": "okhttp/4.9.2"
        }
    });
    const results = [];

    return new Promise((resolve, reject) => {
        connection.on("open", async () => {
            console.log("Connection opened");
            connection.on("message", (data) => {
                const message = JSON.parse(data).imageData[0];
                console.log(data);
                if (message.taskType === "imageInference") {
                    results.push({
                        isNSFW: message.NSFWContent,
                        url: message.imageURL,
                    });
                }
            });

            try {
                connection.send(JSON.stringify({
                    type: "text",
                    role: "image_generation",
                    data: prompt
                }), (err) => {
                    if (err) return reject(new Error("failed to send image request"));
                });

                const timeout = setTimeout(() => {
                    if (!results.length) {
                        reject(new Error("timeout generating images"));
                    }
                }, 15000);

                while (!results.length) await delay(2500);

                clearTimeout(timeout);
                connection.close();
                resolve(results);
            } catch (error) {
                reject(error);
            }
        });

        connection.on("error", (err) => {
            reject(err);
        });
        
        connection.on("close", () => {
            if (!results.length) reject(new Error("connection closed before results"));
        });
    });
}

async function handleImage(prompt) {
  try {
    const data = await flux(prompt);

    const arrayBuf = await axios.get(data[0].url, { responseType: 'arraybuffer' });
    return Buffer.from(arrayBuf);
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  model,
  handleImage
};