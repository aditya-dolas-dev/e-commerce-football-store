const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController.js");

adminRouter.post("/createproduct", adminController.createProduct);

adminRouter.put("/updateproduct/:id", adminController.updateProducts);

module.exports = adminRouter;
