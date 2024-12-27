const mongoose = require('mongoose');

const ipSchema = new mongoose.Schema({
  ip: { type: String, unique: true, default: '' },
  usage: { type: Number, default: 0 },
  timestamp: { type: Number, default: 0 }
});

module.exports = mongoose.model("ipAddress", ipSchema);
