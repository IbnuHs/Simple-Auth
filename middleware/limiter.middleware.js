const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    code: 429,
    message: "Terlalu banyak percobaan login, coba lagi nanti",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
