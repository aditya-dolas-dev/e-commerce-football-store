const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function userAuthentication(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({ msg: "Token Invalid" });
    }

    const jwtToken = authHeader.split(" ")[1];

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    if (decodedValue) {
      req.user = decodedValue;
      next();
    }
  } catch (error) {
    return res.status(403).json({});
  }
}

module.exports = userAuthentication;
