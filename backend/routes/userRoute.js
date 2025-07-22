const express = require("express");
const userRouter = require("express").Router();
const userController = require("../controller/userController");
const userAuthentication = require("../middleware/userAuthentication");

userRouter.post("/signup", userController.signup);

userRouter.post("/login", userController.login);

userRouter.get("/profile", userAuthentication, userController.profile);

module.exports = userRouter;
