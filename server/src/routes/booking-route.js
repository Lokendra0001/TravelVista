// server/routes/verifyPayment.js
const { Router } = require("express");
const Stripe = require("stripe");
const checkAuthentication = require("../middleware/auth");
const bookingModel = require("../model/booking-model");
const tourModel = require("../model/tour-model");
const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post("/", checkAuthentication, async (req, res) => {
    const { sessionId } = req.body;

    try {
        // 1️⃣ Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // 2️⃣ Confirm payment success
        if (session.payment_status !== "paid") {
            return res.json({ paid: false, msg: "Payment not completed yet!" });
        }

        // 3️⃣ Prevent duplicate bookings
        const existingBooking = await bookingModel.findOne({ stripeSessionId: session.id });
        if (existingBooking) {
            return res.json({ paid: true, booking: existingBooking, msg: "Already booked!" });
        }

        // 4️⃣ Extract metadata safely
        const { tourId, travelers, customerName, customerPhone, specialRequests } = session.metadata;
        const totalTravelers = parseInt(travelers);
        const totalAmountInRupees = session.amount_total / 100;

        // 5️⃣ Find tour
        const tour = await tourModel.findById(tourId);
        if (!tour) return res.status(404).json({ msg: "Tour not found!" });

        // 6️⃣ Check seat availability
        if (tour.availableSeats < totalTravelers) {
            return res.status(400).json({ msg: "Tour seats already occupied!" });
        }

        // 7️⃣ Create booking entry
        const booking = await bookingModel.create({
            tour: tourId,
            user: req.user._id,
            fullName: customerName,
            phone: customerPhone,
            numberOfTravelers: totalTravelers,
            specialRequests: specialRequests || "",
            totalPrice: totalAmountInRupees,
            stripeSessionId: session.id,
        });

        // 8️⃣ Update available seats
        tour.availableSeats -= totalTravelers;
        await tour.save();

        // 9️⃣ Send response
        res.json({ paid: true, booking, msg: "Tour booked successfully!" });

    } catch (err) {
        console.error("Payment verification error:", err);
        res.status(500).json({ msg: "Unable to verify payment" });
    }
});


router.get("/", checkAuthentication, async (req, res) => {
    try {
        const bookedTours = await bookingModel.find({ user: req?.user?._id }).populate('tour');
        return res.status(200).json({ msg: "Booked Tour Founded!", bookings: bookedTours, success: true });
    } catch (err) {
        return res.status(500).json({ msg: `Internal Server Error : ${err.message}` })
    }
})

router.get("/all", async (req, res) => {
    try {
        const bookedTours = await bookingModel.find().populate('tour');
        return res.status(200).json({ msg: "Booked Tour Founded!", bookings: bookedTours, success: true });
    } catch (err) {
        return res.status(500).json({ msg: `Internal Server Error : ${err.message}` })
    }
})
module.exports = router;
