const jwt = require("jsonwebtoken");

const generateTokenUser = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_USER, { expiresIn: "15d" });
};

module.exports = generateTokenUser;
