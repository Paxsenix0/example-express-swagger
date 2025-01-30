const novaAI = require('./nova-ai.js');
const gpt4omini = require('./gpt4omini.js');
const gpt3 = require('./gpt3.js');
const gpt4 = require('./gpt4.js');
const gemini = require('./gemini.js');
const sdxl = require('./startnest.js');
const flux = require('./genius.js');

const chatModels = [novaAI, gpt4omini, gemini, gpt3, gpt4];
const imageModels = [sdxl, flux];

function getChatModelHandler(modelName) {
  return chatModels.find((m) => m.model === modelName)?.handleMessage || null;
}

function getAvailableChatModels() {
  return chatModels.map((m) => m.model);
}

function getImageModelHandler(modelName) {
  return imageModels.find((m) => m.model === modelName)?.handleImage || null;
}

function getAvailableImageModels() {
  return imageModels.map((m) => m.model);
}


module.exports = { 
  getChatModelHandler, 
  getAvailableChatModels,  
  getImageModelHandler,
  getAvailableImageModels
};
