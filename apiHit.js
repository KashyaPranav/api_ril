const mongoose = require('mongoose');

const apiHitSchema = new mongoose.Schema({
    apiName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    serviceName: { type: String, required: true },
    ip: { type: String, required: true },
    deviceInfo: { type: String },
    method: { type: String, enum: ['GET', 'POST'], required: true },
    responseTime: { type: Number, required: true },
    status: { type: Boolean, required: true },
    statusCode: { type: Number, required: true }
});

module.exports = mongoose.model("ApiHit", apiHitSchema);