const express = require('express');
const { getChatModelHandler, getAvailableChatModels } = require('../plugins/index.js');;

const chatRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AIResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Additional message for the user
 *         ok:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *       example:
 *         message: "Hello! How can i assist you tomorrow?"
 *         ok: true
 * 
 */

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Artificial intelligence endpoint to interact with AI, like chatting.
 */

/**
 * @swagger
 * /v1/chat/completions:
 *   post:
 *     summary: Nova-AI
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: The model of the chat AI, leave it empty to see available models
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant, system]
 *                       description: The role of the entity in the conversation
 *                     content:
 *                       type: string
 *                       description: The actual message content
 *           example:
 *             model: "nova-ai"
 *             messages:
 *               - role: user
 *                 content: "Hello"
 *     responses:
 *       200:
 *         description: Success - Got the response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AIResponse'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
chatRoutes.post('/v1/chat/completions', async (req, res) => {
  const body = req.body;

  if (!body || !Array.isArray(body) || body.messages.length === 0) {
    return res.status(400).json({ message: 'invalid request body', ok: false });
  }

  const { model } = body;
  const handleMessage = getChatModelHandler(model);

  if (!handleMessage) {
    return res.status(400).json({
      message: 'invalid model! see available models',
      models: getAvailableChatModels(),
      ok: false,
    });
  }

  try {
    const response = await handleMessage(body.messages);
    if (!response) {
      return res.status(500).json({ message: 'failed to get a response from the AI', ok: false });
    }
    res.status(200).json({ message: response, ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error', ok: false });
  }
});

module.exports = chatRoutes;
