const { Router } = require("express");
const upload = require("../libs/cloudinaryConfig");
const Tour = require("../model/tour-model");
const checkAuthentication = require("../middleware/auth");
const router = Router();

router.post("/", upload.array("images", 10), async (req, res) => {
    try {
        const {
            tourName,
            destination,
            description,
            duration,
            pricePerPerson,
            category,

            hotelName,
            hotelType,
            hotelLocation,
            hotelRoomType,
            hotelMealPlan,

            transportMode,
            transportPickup,
            transportDrop,

            itinerary,

            startDate,
            endDate,
            availableSeats,
            rating,

        } = req.body;


        const uploadedImages = req.files.map((file) => file.path);

        const createdTour = await Tour.create({ tourName, destination, description, duration, pricePerPerson, category, hotelName, hotelType, hotelLocation, hotelRoomType, hotelMealPlan, transportMode, transportPickup, transportDrop, itinerary: JSON.parse(itinerary), startDate, endDate, availableSeats, rating, images: uploadedImages })

        return res.status(201).json({ msg: "Tour Created Successfully!", tourId: createdTour._id })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: `Internal Server Error :${err.message}` })
    }
})
router.get("/", checkAuthentication, async (req, res) => {
    try {
        const tours = await Tour.find({ availableSeats: { $gt: 0 } }).sort({ updatedAt: -1 });

        const nowMs = Date.now();

        const allTours = tours.filter(tour => {
            const tourMs = new Date(tour.startDate).getTime();
            return tourMs > nowMs;
        });

        return res.status(200).json({ msg: "Tours Fetched Successfully!", tours: allTours });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: `Internal Server Error: ${err.message}` });
    }
});

router.get("/:id", checkAuthentication, async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById({ _id: id });
        return res.status(201).json({ msg: "Tour Fetched Successfully!", tour })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: `Internal Server Error :${err.message}` })
    }
})

module.exports = router;