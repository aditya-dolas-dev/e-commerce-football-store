const express = require("express");
const reviewRoute = require("../controller/reviewController");
const reviewRouter = express.Router();
const userAuthentication = require("../middleware/userAuthentication");

reviewRouter.post(
  "/addreview",
  userAuthentication.authentication,
  userAuthentication.authorizeRole("user"),
  reviewRoute.createReview
);

module.exports = reviewRouter;
