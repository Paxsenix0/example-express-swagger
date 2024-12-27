const novaAI = require('./nova-ai.js');

const models = [novaAI];

function getChatModelHandler(modelName) {
  return models.find((m) => m.model === modelName)?.handleMessage || null;
}

function getAvailableChatModels() {
  return models.map((m) => m.model);
}

module.exports = { getChatModelHandler, getAvailableChatModels };
