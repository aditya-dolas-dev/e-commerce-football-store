const express = require("express");
const userRouter = require("express").Router();
const userController = require("../controller/userController");
const userAuthentication = require("../middleware/userAuthentication");

userRouter.post("/signup", userController.signup);

userRouter.post("/login", userController.login);

userRouter.get(
  "/profile",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("user"),
  userController.profile
);

userRouter.put(
  "/update",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("user"),
  userController.updateProfile
);

userRouter.post(
  "/createAddress",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("user"),
  userController.addressCreate
);

userRouter.get(
  "/fetchaddress",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("user"),
  userController.addressFetch
);

userRouter.put(
  "/updateaddress/:id",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("user"),
  userController.addressUpdate
);

module.exports = userRouter;
