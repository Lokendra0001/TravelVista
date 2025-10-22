// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        numberOfTravelers: {
            type: Number,
            required: true,
            min: 1,
        },
        specialRequests: {
            type: String,
            trim: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },

        stripeSessionId: {
            type: String,
        },
        bookedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
