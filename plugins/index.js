const novaAI = require('./nova-ai.js');
const sdxl = require('./startnest.js');

const chatModels = [novaAI];
const imageModels = [sdxl];

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
