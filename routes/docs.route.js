const { setup, serve } = require('../swagger.js');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const swaggerOptions = require('../config/swagger.config.js');

const docsRoutes = express.Router();

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
const specs = swaggerJsDoc(swaggerOptions);

docsRoutes.use(
  '/docs',
  serve,
  setup(specs, {
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .opblock .opblock-summary-path {
        display: inline-block;
        word-break: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
    `,
    customCssUrl: CSS_URL,
    customSiteTitle: 'Example Rest API'
  })
);

module.exports = docsRoutes;
