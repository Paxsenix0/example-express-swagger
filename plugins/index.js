const novaAI = require('./nova-ai.js');

const chatModels = [novaAI];

function getChatModelHandler(modelName) {
  return chatModels.find((m) => m.model === modelName)?.handleMessage || null;
}

function getAvailableChatModels() {
  return chatModels.map((m) => m.model);
}

module.exports = { getChatModelHandler, getAvailableChatModels };
