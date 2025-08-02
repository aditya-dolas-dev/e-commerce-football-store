const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/productController.js");

productRouter.get("/bycategory/:category", productController.products);

productRouter.get("/jersey/:id", productController.selectedProduct);
productRouter.get("/jersey", productController.getAllProduct);

module.exports = productRouter;
