const ApiHit = require("../models/apiHit");
const moment = require("moment");

const trackApiUsage = async (req, res, next) => {
  const start = Date.now();
  const endpoint = req.path;
  const method = req.method;
  const apiName = endpoint.split("/")[1];
  const serviceName = "ExampleService";
  const ip = req.ip;
  const deviceInfo = req.get('User-Agent');
  const status = res.statusCode >= 200 && res.statusCode < 300; 
  const statusCode = res.statusCode;

  res.on("finish", async () => {
    const responseTime = Date.now() - start;

    try {
      await ApiHit.create({
        apiName,
        serviceName,
        ip,
        deviceInfo,
        method,
        responseTime,
        status,
        statusCode,
      });
    } catch (error) {
      console.error("Error tracking API usage:", error);
    }
  });

  next();
};



module.exports = trackApiUsage;


