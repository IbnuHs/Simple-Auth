const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, Empty Token",
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.statu(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
}

module.exports = authMiddleware;
