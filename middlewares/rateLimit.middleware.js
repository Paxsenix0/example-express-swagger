const ipAddressService = require('../services/ip.service.js');

const rateLimiter = async (req, res, next) => {
    const ip = await getIpFromRequest(req);
    const isAllowed = await ipAddressService.checkUsage(ip);
    if (!isAllowed) {
        return res.status(429).json({ message: 'Too Many requests, genius.', ok: false });
    }
    await ipAddressService.addUsage(ip);
    next();
};

async function getIpFromRequest(request) {
    let ip = request.ip ?? request.headers["x-real-ip"];
    if (!ip || ip === '127.0.0.1') {
      const forwardedFor = request.headers["x-forwarded-for"];
      ip = forwardedFor.split(",").at(0) ?? null;
    }
    return ip;
}

module.exports = rateLimiter;
