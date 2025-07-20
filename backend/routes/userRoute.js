const express = require("express");
const router = require("express").Router();
const userController = require("../controller/userController");
const userAuthentication = require("../middleware/userAuthentication");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/profile", userAuthentication, userController.profile);

module.exports = router;
