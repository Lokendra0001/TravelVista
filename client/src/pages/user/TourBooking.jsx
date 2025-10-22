import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  Users,
  MapPin,
  Clock,
  Star,
  Shield,
  User,
  Mail,
  Phone,
  CalendarCheck,
} from "lucide-react";
import axios from "axios";

// Assuming you have these reusable components
import { Input, Select, Button } from "../../components/common/";
import { SERVER_API, SUB_API } from "../../utils/serverApiConfig";

const TourBooking = () => {
  const location = useLocation();
  const tourDetails = location.state || {};

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      travelers: 1,
      specialRequests: "",
    },
  });

  const travelers = watch("noOfTravelers");

  const calculateTotal = () => {
    const basePrice = tourDetails?.pricePerPerson || 0;
    const baseAmount = basePrice * travelers?.split(" ")[0];
    const tax = baseAmount * 0.02;
    const serviceFee = 299;
    return {
      baseAmount,
      tax,
      serviceFee,
      total: baseAmount + tax + serviceFee,
    };
  };

  const totals = useMemo(calculateTotal, [travelers, tourDetails]);

  const onSubmit = async (data) => {
    try {
      console.log(tourDetails);
      const numberOfTravelers = Number(
        watch("noOfTravelers")?.split(" ")[0] || 1
      );

      const sendPayload = {
        tourDetails,
        numberOfTravelers,
        fullName: data?.fullName,
        phone: data?.phone,
        specialRequests: data?.specialRequests,
      };

      const res = await axios.post(
        `${SERVER_API}${SUB_API.PAYMENT.CREATE_CHECKOUT_SESSION}`,
        sendPayload,
        { withCredentials: true }
      );

      window.location.href = res?.data?.url; // Redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Complete Your Booking
          </h1>
          <p className="text-text-secondary text-lg">
            Secure your spot for an unforgettable journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-light-border">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={tourDetails?.images?.[1]}
                  alt={tourDetails?.tourName}
                  className="w-full md:w-48 h-48 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-bold text-text-primary">
                      {tourDetails?.tourName}
                    </h2>
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">
                        {tourDetails?.rating}
                      </span>
                    </div>
                  </div>

                  {/* Short Info */}
                  <div className="space-y-2 mb-4 text-text-secondary">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {tourDetails?.destination}
                    </div>
                    <div className="flex items-center">
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      {new Date(tourDetails?.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                    </div>
                  </div>

                  {/* Extra Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        Tour Details:
                      </h4>
                      <ul className="space-y-1 text-text-secondary">
                        <li>
                          📍 <strong>Destination:</strong>{" "}
                          {tourDetails?.destination}
                        </li>
                        <li>
                          ⏰ <strong>Duration:</strong> {tourDetails?.duration}
                        </li>
                        <li>
                          🏨 <strong>Hotel:</strong> {tourDetails?.hotelName}
                        </li>
                        <li>
                          🛏️ <strong>Room:</strong> {tourDetails?.hotelRoomType}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        Includes:
                      </h4>
                      <ul className="space-y-1 text-text-secondary">
                        <li>
                          🚌 <strong>Transport:</strong>{" "}
                          {tourDetails?.transportMode}
                        </li>
                        <li>
                          🍽️ <strong>Meals:</strong>{" "}
                          {tourDetails?.hotelMealPlan}
                        </li>
                        <li>
                          ⭐ <strong>Hotel Type:</strong>{" "}
                          {tourDetails?.hotelType}
                        </li>
                        <li>
                          🏷️ <strong>Category:</strong> {tourDetails?.category}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl shadow-lg p-6 border border-light-border"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Traveler Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Travelers */}
                <Select
                  label="Number of Travelers *"
                  icon={Users}
                  options={[
                    "1 Traveler",
                    "2 Traveler",
                    "3 Traveler",
                    "4 Traveler",
                    "5 Traveler",
                    "6 Traveler",
                  ]}
                  {...register("noOfTravelers", {
                    required: "Travelers required!",
                  })}
                />

                {/* Full Name */}
                <Input
                  label="Full Name *"
                  icon={User}
                  placeholder="Enter your full name"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  error={errors.fullName?.message}
                />
                {/* Email */}
                <Input
                  type="email"
                  label="Email Address *"
                  icon={Mail}
                  placeholder="your@email.com"
                  {...register("email", { required: "Email is required" })}
                  error={errors.email?.message}
                />
                {/* Phone */}
                <Input
                  type="tel"
                  label="Phone Number *"
                  icon={Phone}
                  placeholder="+91 98765 43210"
                  {...register("phone", { required: "Phone is required" })}
                  error={errors.phone?.message}
                />
                {/* Special Requests */}
                <Input
                  label="Special Requests"
                  textarea
                  rows={4}
                  placeholder="Any dietary restrictions, accessibility needs, or special requirements..."
                  {...register("specialRequests")}
                />
              </div>
            </form>
          </div>

          {/* Right Column - Price Summary */}
          <div>
            <div className="sticky top-20 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Price Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-text-secondary">
                    <span>
                      Base Price ({travelers?.split(" ")[0]}{" "}
                      {travelers?.split(" ")?.[0] === 1 ? "person" : "people"})
                    </span>
                    <span>₹{totals.baseAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Tax (2%)</span>
                    <span>₹{totals.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Service Fee</span>
                    <span>₹{totals.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-light-border pt-3">
                    <div className="flex justify-between text-lg font-bold text-text-primary">
                      <span>Total Amount</span>
                      <span>₹{totals.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-light-border pt-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                    <Shield className="w-4 h-4 text-success" />
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="text-success">✓</span>
                    <span>Best Price Guarantee</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full mt-6 bg-primary hover:bg-primary-hover py-3 text-white"
                >
                  Confirm Booking - ₹{totals.total.toLocaleString()}
                </Button>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Our travel experts are here to assist you 24/7
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-blue-700">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+91 1800-123-456</span>
                  </div>
                  <div className="flex items-center text-blue-700">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>support@travelvista.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBooking;
