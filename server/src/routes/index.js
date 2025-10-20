const userRouter = require("./user-route");
const tourRouter = require("./tour-route");
const { Router } = require("express");
const router = Router();

router.use("/user", userRouter);
router.use("/tour", tourRouter);

module.exports = router;
