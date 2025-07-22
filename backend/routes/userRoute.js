const express = require("express");
const userRouter = require("express").Router();
const userController = require("../controller/userController");
const userAuthentication = require("../middleware/userAuthentication");

userRouter.post("/signup", userController.signup);

userRouter.post("/login", userController.login);

userRouter.get(
  "/profile",
  userAuthentication.Authentication,
  userAuthentication.authorizeRole("user"),
  userController.profile
);

userRouter.put(
  "/update",
  userAuthentication.Authentication,
  userAuthentication.authorizeRole("user"),
  userController.updateProfile
);

module.exports = userRouter;
