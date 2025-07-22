const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/productController.js");

productRouter.get("/bycategory/:category", productController.products);

module.exports = productRouter;
