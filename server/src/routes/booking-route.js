// server/routes/verifyPayment.js
const { Router } = require("express");
const checkAuthentication = require("../middleware/auth");
const { handleCreateBooking, handleGetAllUserBookedTour, handleGetAllBookedTour } = require("../controller/booking-route");
const router = Router();


router.post("/", checkAuthentication, handleCreateBooking);


router.get("/", checkAuthentication, handleGetAllUserBookedTour)


router.get("/all", handleGetAllBookedTour)
module.exports = router;
