const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimiter = require('./middlewares/rateLimit.middleware.js');
const connectDB = require('./config/db.config.js');
const docsRoutes = require('./routes/docs.route.js');
const chatRoutes = require('./routes/chat.route.js');

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

app.use(docsRoutes);
app.use(chatRoutes);

app.all("*", (req, res) => res.status(404).json({ message: "Invalid endpoint/method, are you lost? :(", ok: false }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'something broke!', ok: false });
});

app.listen(3000, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
