const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/add-product", adminController.addProduct);

router.delete("/delete/:prodId", adminController.deleteProduct);

module.exports = router;
