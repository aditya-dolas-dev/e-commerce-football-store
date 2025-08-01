const express = require("express");
const router = express.Router();
const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const adminRouter = require("./adminRouter");
const reviewRouter = require("./reviewRoute");
const cartRouter = require("./cartRoute");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/admin", adminRouter);
router.use("/review", reviewRouter);
router.use("/cart", cartRouter);

module.exports = router;
