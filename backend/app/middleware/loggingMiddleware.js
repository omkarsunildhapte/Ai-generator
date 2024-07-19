const logger = require('../models/logger');

const logRequest = (req, res, next) => {
  res.on('finish', () => {
    const logEntry = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      userId: req.query.userId || null,
      tenantId: req.query.tenantId || null,
      timestamp: new Date().toISOString()
    };
    logger.info(logEntry);
  });
  next();
};

module.exports = logRequest;
