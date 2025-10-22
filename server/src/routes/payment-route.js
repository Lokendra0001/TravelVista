const express = require("express");
const { handlePayment } = require("../controller/payment-route");
const router = express.Router();

router.post("/create-checkout-session", handlePayment);

module.exports = router;
