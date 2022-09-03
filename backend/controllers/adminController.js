const mongoose = require("mongoose");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

const saltRounds = 12;

exports.addProduct = (req, res, next) => {
  const { title, price, description, imageUrl, category } = req.body;

  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    category,
  });
  product
    .save()
    .then((result) => {
      console.log("product created successfully");
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        const error = new Error("No product found with given id");
        error.statusCode = 404;
        throw error;
      }
      console.log("found product", product);
      return Product.findByIdAndDelete(prodId);
    })
    .then((data) => {
      res.json({ message: "Product deleted successfully!" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        const err = new Error("No such product found");
        err.statusCode = 404;
        throw err;
      }
      res.send(product);
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postSignUp = (req, res, next) => {
  const { name, email, password } = req.body;
  Admin.findOne({ email: email })
    .then((user) => {
      if (user) {
        const err = new Error("User with given email already exists");
        err.statusCode = 409;
        throw err;
      }
      return bcrypt.hash(password, saltRounds);
    })
    .then((hashedPassword) => {
      const admin = new Admin({
        name: name,
        email: email,
        password: hashedPassword,
      });
      return admin.save();
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
  Admin.find({ email: email })
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

      const token = generateToken(user._id);
      res.json({ email: email, name: user[0].name, token: token });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const { id, title, price, description, imageUrl, category } = req.body;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        const err = new Error("Product with given id does not exist.");
        err.statusCode = 404;
        throw err;
      }

      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      product.category = category;
      return product.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
