const ipAddressService = require('../services/ip.service.js');

const rateLimiter = async (req, res) => {
    const ip = req.ip; // or however u get the client ip
    const isAllowed = await ipAddressService.checkUsage(ip);
    if (!isAllowed) {
        return res.status(429).json({ message: 'too many requests', ok: false });
    }
    await ipAddressService.addUsage(ip);
    next();
};

module.exports = rateLimiter;
