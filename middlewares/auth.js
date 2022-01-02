const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.status(401).json({ message: "Missing token" });
  const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
  if (!tokenVerify) return res.status(401).json({ message: "Invalid token" });
  req.user = tokenVerify;
  next();
};

module.exports = auth;
