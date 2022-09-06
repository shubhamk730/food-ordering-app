const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/products", userController.getAllProducts);

router.post("/signup", userController.postSignup);

router.post("/login", userController.postLogin);

// router.get("/products/:productId", userController.getAllProducts);

module.exports = router;
