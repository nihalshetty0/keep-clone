const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(400).json({ msg: "Authorization denied" });

  try {
    const decode = jwt.verify(token, process.env.jwtSecret);
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
