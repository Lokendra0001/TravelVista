const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const handlePayment = async (req, res) => {
    const { tourDetails, numberOfTravelers, fullName, phone, specialRequests } = req.body;

    const travelers = parseInt(numberOfTravelers) || 1;

    const baseAmount = tourDetails.pricePerPerson * numberOfTravelers * 100; // in paise
    const serviceFee = 29900; // ₹299 in paise
    const taxAmount = Math.floor(baseAmount * 0.02); // 2% of base amount


    // Use first valid image or placeholder
    const tourImage = tourDetails.images?.[0]?.replace(/["\n\r]+/g, '') || "https://via.placeholder.com/150";

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "pay_by_bank"], // only valid options

            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `${tourDetails.tourName} (${travelers} Traveler${travelers > 1 ? "s" : ""})`,
                            description: `
Destination: ${tourDetails.destination}
Duration: ${tourDetails.duration}
Hotel: ${tourDetails.hotelName} (${tourDetails.hotelRoomType})
Transport: ${tourDetails.transportMode}
Meals: ${tourDetails.hotelMealPlan}`,
                            images: [tourImage],
                        },
                        unit_amount: baseAmount,
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Service Fee",
                            description: "Traveling service charges",
                        },
                        unit_amount: serviceFee,
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Tax (GST 2%)",
                            description: "Government tax included",
                        },
                        unit_amount: taxAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            metadata: {
                tourId: tourDetails._id,
                travelers: numberOfTravelers,
                customerName: fullName,      // example field
                customerPhone: phone,    // example field
                specialRequests // example field
            },
            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/tours/${tourDetails._id}`,
        });



        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("Stripe Checkout error:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    handlePayment
}