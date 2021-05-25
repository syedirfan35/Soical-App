const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //check token
  if (!token) {
    return res.status(401).json({ msg: "NO token, Authorization denied!" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecretKey"));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
