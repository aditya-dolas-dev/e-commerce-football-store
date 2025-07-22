const express = require("express");
const router = express.Router();
const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const adminRouter = require("./adminRouter");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/admin", adminRouter);

module.exports = router;
