const express = require("express");
const adminController = require("../controllers/adminController");
const verifyTokenAdmin = require("../middleware/verifyToken");

const router = express.Router();

router.post("/add-product", verifyTokenAdmin, adminController.addProduct);

router.get("/products", verifyTokenAdmin, adminController.getAllProducts);

router.post("/delete", verifyTokenAdmin, adminController.deleteProduct);

router.post("/update", verifyTokenAdmin, adminController.updateProduct);

router.get("/products/:prodId", verifyTokenAdmin, adminController.getProduct);

router.post("/signup", adminController.postSignUp);

router.post("/login", adminController.postLogin);

module.exports = router;
