const Product = require("../models/Product");

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
  const prodId = req.params.prodId;
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
      console.log(data);
      res.json({ message: "Product deleted successfully!" });
    })
    .catch((err) => {
      next(err);
    });
};

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
