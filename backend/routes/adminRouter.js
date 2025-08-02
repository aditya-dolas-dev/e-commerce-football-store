const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController.js");
const userAuthentication = require("../middleware/userAuthentication.js");

adminRouter.post("/signup", adminController.signup);

adminRouter.post("/login", adminController.login);

adminRouter.post(
  "/createproduct",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("admin"),
  adminController.createProduct
);

adminRouter.put(
  "/updateproduct/:id",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("admin"),
  adminController.updateProducts
);

adminRouter.delete(
  "/deleteproduct/:id",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("admin"),
  adminController.deleteProduct
);

module.exports = adminRouter;
