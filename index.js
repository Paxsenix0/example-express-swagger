const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimiter = require('./middlewares/rateLimit.middleware.js');
const connectDB = require('./config/db.config.js');
const chatRoutes = require('./routes/chat.route.js');
const imageRoutes = require('./routes/image.route.js');
const { setup, serve } = require('./swagger.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();
const app = express();
app.set('trust proxy', true);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(async (req, res, next) => {
    /* Connect to Database */
    await connectDB();
    next();
});

/* Set up Rate Limiter */
app.use(rateLimiter);

/* You can set up home page or something like that. */
app.get('/', (req, res) => res.status(200).json({ message: 'Hello World!', ok: false }));

/* `/v1/chat/completions` routes */
app.use(chatRoutes);

/* `/v1/image/completions` routes */
app.use(imageRoutes);

/* Setup Swagger UI on `/docs` routes */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Example-Rest-API',
      version: '1.0.0',
      description: "your description!",
      contact: {
        name: "PaxSenix0",
        url: "https://api.paxsenix.biz.id",
        email: "alex24dzn@proton.me"
      },
      license: {
        name: "MIT LICENSE",
        url: "https://github.com/Paxsenix0/example-express-swagger/blob/initial/LICENSE"
      }
    },
    servers: [
      { 
        url: 'https://paxsenix0-rest-api.vercel.app', 
        description: 'url' 
      }
    ],
    tags: [
      { name: "AI" },
      { name: "AI-IMAGE" }
    ]
  },
  apis: ["./routes/*.js", "./routes/*.route.js"]
};

const specs = swaggerJsDoc(swaggerOptions);

app.use(
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
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css",
    customSiteTitle: 'Example Rest API'
  })
);

app.get("*", (req, res) => res.status(404).json({ message: "Invalid endpoint/method, are you lost? :(", ok: false }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'something broke!', ok: false });
});

app.listen(3000, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
