const Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateTokenUser = require("../config/generateToken").generateTokenUser;

const saltRounds = 10;

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.postSignup = (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const err = new Error("User with given email already exists");
        err.statusCode = 409;
        throw err;
      }
      return bcrypt.hash(password, saltRounds);
    })
    .then((hashedPassword) => {
      const registerUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
      });
      return registerUser.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  let user;
  User.find({ email: email })
    .then((u) => {
      if (!u) {
        const err = new Error("No user found with such email");
        err.statusCode = 404;
        throw err;
      }
      user = u;
      const userPassword = user[0].password;
      return bcrypt.compare(password, userPassword);
    })
    .then((result) => {
      if (!result) {
        const err = new Error("Password do not match");
        err.statusCode = 401;
        throw err;
      }

      const token = generateTokenUser(user._id);
      res.json({ email: email, name: user[0].name, token: token });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
