const { Schema, model } = require('mongoose');

const tourSchema = new Schema(
    {
        tourName: { type: String, required: true },
        destination: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: String, required: true },          // e.g., "4 Days / 3 Nights"
        pricePerPerson: { type: Number, required: true },
        category: {
            type: String,
            enum: ["heritage", "nature", "beach", "adventure", "spiritual", "pilgrimage"],
            default: "adventure"
        },

        // Hotel Info
        hotelName: { type: String, required: true },
        hotelType: { type: String, required: true },
        hotelLocation: { type: String, required: true },
        hotelRoomType: { type: String, required: true },
        hotelMealPlan: { type: String, required: true },

        // Transport Info
        transportMode: { type: String, required: true },
        transportPickup: { type: String, required: true },
        transportDrop: { type: String, required: true },

        // Itinerary
        itinerary: [
            {
                day: { type: Number, required: true },
                title: { type: String, required: true },
                activities: { type: String, required: true },
            },
        ],

        // Images
        images: [{ type: String }],                          // Array of image URLs

        // Dates & Additional Info
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        availableSeats: { type: Number, required: true },
        rating: { type: Number, default: 0 },

    },
    { timestamps: true }
);


module.exports = model("Tour", tourSchema);
