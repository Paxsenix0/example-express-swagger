const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimiter = require('./middlewares/rateLimit.middleware.js');

dotenv.config();

const app = express();
app.set('trust proxy', true);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!', ok: false });
})

app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'Tested!', ok: true });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'something broke!', ok: false });
});

app.listen(3000, () => {
    console.log(`server running on http://localhost:${PORT}`);
});