const { v4: uuidv4 } = require('uuid');
const { AuditTrail } = require('../model');


const auditMiddleware = async (req, res, next) => {
  const action = req.method;
  let ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  // let ipAddress = req.ip;

  if (ipAddress === "::1") {
    ipAddress = "127.0.0.1"; // Convert IPv6 loopback to IPv4
  }

  const originalSend = res.send;
  res.send = async function (body) {
    const parsedBody = JSON.parse(body); // Attach the response body
    res.details =
        parsedBody?.message || parsedBody?.status;
    return originalSend.call(this, body); // Call the original `send` method
  };
  await res.on('finish', async () => {
    try {
      const auditTrail = {
        auditId: uuidv4(),
        action,
        ipAddress,
        details: res.details,
      };
      await AuditTrail
        .query()
        .insert(auditTrail);
    } catch (err) {
      console.error('Error logging audit trail:', err.message);
    }
  });

  next();
};

module.exports = { auditMiddleware }