const express = require("express");
const cartRouter = express.Router();
const userAuthentication = require("../middleware/userAuthentication");
const cartController = require("../controller/cartController");

cartRouter.post("/createcart", cartController.createCart);

cartRouter.put("/updatecart", cartController.cartUpdate);

cartRouter.delete("/deletecart", cartController.cartDelete);

cartRouter.get("/cartfetch", cartController.cartFetch);

cartRouter.post(
  "/mergecart",
  userAuthentication.authentication,
  cartController.cartMerge,
  userAuthentication.authorizeRole("user")
);

module.exports = cartRouter;
