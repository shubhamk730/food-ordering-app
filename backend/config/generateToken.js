const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

const generateTokenUser = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_USER, { expiresIn: "15d" });
};

module.exports = { generateToken, generateTokenUser };
