const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const verifyTokenAdmin = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = Admin.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
};

const verifyTokenUser = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

      const user = Admin.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
};

module.exports = { verifyTokenAdmin, verifyTokenUser };
