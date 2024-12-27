const IP = require('../models/ip.model');

const USAGE_LIMIT = 15;
const TIME_LIMIT = 60 * 1000;

async function addNewIp(ip) {
  if (!ip) return;
  try {
     const ipAddress = await IP.findOne({ ip });
     let resultIpAddress;
     if (!subscription) {
        resultIpAddress = await IP.create({
          ip: ip,
          usage: 0,
          timestamp: Date.now()
        });
     } else {
        resultIpAddress = ipAddress;
     }
     return resultIpAddress;
  } catch (e) {
     console.error(e);
     return null;
  }
}

async function addUsage(ip) {
  try {
     const ipAddress = await IP.findOne({ ip });
     if (!ipAddress) {
        await addNewIp(ip);
     } else {
        ipAddress.usage += 1;
        await ipAddress.save();
     }
     return true;
  } catch (e) {
     console.error(e);
     return true;
  }
}

async function checkUsage(ip) {
  try {
     const ipAddress = await IP.findOne({ ip });
     const currentTime = Date.now();
     if (!ipAddress) {
        await addNewIp(ip);
        return true;
     }
     const timeElapsed = currentTime - ipAddress.timestamp;
     if (timeElapsed > TIME_LIMIT) {
        ipAddress.usage = 0;
        ipAddress.timestamp = currentTime;
        await ipAddress.save();
     }
     if (ipAddress.usage >= USAGE_LIMIT) {
        return false;
     }
     return true;
  } catch (e) {
     console.error(e);
     return true;
  }
}

module.exports = {
    addNewIp,
    addUsage,
    checkUsage,
};