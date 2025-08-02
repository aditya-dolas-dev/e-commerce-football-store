const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function authentication(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({ msg: "Token Invalid" });
    }

    const jwtToken = authHeader.split(" ")[1];

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    const { userId, role } = decodedValue;

    if (!role || !userId) {
      return res.status(403).json({ msg: "Invalid Token Payload" });
    }

    req.userRole = role;
    req.user = { userId };
    next();
  } catch (error) {
    return res.status(403).json({});
  }
}

function authorizeRole(expectedRole) {
  return (req, res, next) => {
    if (req.userRole !== expectedRole) {
      return res
        .status(403)
        .json({ msg: "Access Denied: You are not authorized" });
    }
    next();
  };
}

module.exports = { authentication, authorizeRole };
