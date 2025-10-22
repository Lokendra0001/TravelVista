const userRouter = require("./user-route");
const tourRouter = require("./tour-route");
const paymentRouter = require("./payment-route");
const bookingRouter = require("./booking-route");
const { Router } = require("express");
const router = Router();

router.use("/user", userRouter);
router.use("/tour", tourRouter);
router.use("/payment", paymentRouter);
router.use("/booking", bookingRouter);

module.exports = router;
