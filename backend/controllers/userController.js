const Product = require("../models/Product");

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
