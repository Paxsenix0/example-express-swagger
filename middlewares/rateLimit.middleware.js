const ipAddressService = require('../services/ip.service.js');

const rateLimiter = async (req, res, next) => {
    const ip = req.ip;
    const isAllowed = await ipAddressService.checkUsage(ip);
    if (!isAllowed) {
        return res.status(429).json({ message: 'Too Many requests, genius.', ok: false });
    }
    await ipAddressService.addUsage(ip);
    next();
};

module.exports = rateLimiter;
