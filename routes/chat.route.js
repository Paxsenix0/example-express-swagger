/*const express = require('express');
const { model: novaModel, data: novaAI } = require('../plugins/nova-ai.js');

const chatRoutes = express.Router();

chatRoutes.post('/v1/chat/completions', async (req, res) => {
  const body = req.body;

  if (!body || !Array.isArray(body) || body.length === 0) {
    return res.status(400).json({ message: 'invalid request body', ok: false });
  }

  if (!body.model || body.model.includes([novaModel])) {
    return res.status(400).json({ message: 'invalid model! see available models', models: [novaModel], ok: false });
  }

  try {
    const response = await novaAI(body);
    if (!response) {
      return res.status(500).json({ message: 'failed to get a response from the AI', ok: false });
    }
    res.status(200).json({ message: response, ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error', ok: false });
  }
});

module.exports = chatRoutes;*/
