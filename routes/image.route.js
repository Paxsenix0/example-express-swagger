const express = require('express');
const { getImageModelHandler, getAvailableImageModels } = require('../plugins/index.js');

const imageRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI-IMAGE
 *   description: Artificial intelligence Image Generator endpoint to Generate Image with AI.
 */

/**
 * @swagger
 * /v1/image/completions:
 *   post:
 *     summary: SDXL
 *     tags: [AI-IMAGE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: The model of the image AI, leave it empty to see available models
 *               prompt:
 *                 type: string
 *                 description: The prompt.
 *           example:
 *             model: "sdxl"
 *             prompt: "a cat"
 *     responses:
 *       200:
 *         description: Success - Got the response
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
imageRoutes.post('/v1/image/completions', async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ message: 'invalid request body', ok: false });
  }

  const { model } = body;
  const handleImage = getImageModelHandler(model);

  if (!handleImage) {
    return res.status(400).json({
      message: 'invalid model! see available models',
      models: getAvailableImageModels(),
      ok: false,
    });
  }

  try {
    const response = await handleImage(body.prompt);
    if (!response) {
      return res.status(500).json({ message: 'failed to get a response from the AI', ok: false });
    }
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error', ok: false });
  }
});

module.exports = imageRoutes;
