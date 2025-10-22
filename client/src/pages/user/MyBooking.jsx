import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_API, SUB_API } from "../../utils/serverApiConfig";
import { Button } from "../../components/common/Index";
import { downloadInvoice } from "../../utils/downloadInvoice";
import useUser from "../../custom-hooks/useUser";
import {
  AiOutlineLoading3Quarters,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { role } = useUser();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const endpoint =
        role === "user"
          ? SUB_API.BOOKING.GET_USER_BOOKINGS
          : SUB_API.BOOKING.GET_ALL_BOOKINGS;

      const url = `${SERVER_API}${endpoint}`;

      const response = await axios.get(url, { withCredentials: true });

      if (response.data.success) {
        setBookings(response.data.bookings || []);
      } else {
        setError("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const handleReturnHome = () => navigate("/");

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center  bg-background py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <AiOutlineLoading3Quarters className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-text-secondary">Loading your bookings...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AiOutlineExclamationCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Unable to Load Bookings
          </h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <Button
            onClick={fetchBookings}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-semibold"
          >
            Try Again
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-normal mb-2">
            {role === "admin" ? "All Bookings" : "My Bookings"}
          </h1>
          <p className="text-text-secondary">
            {role === "admin"
              ? "Manage and view all user bookings"
              : "Manage and view all your tour bookings"}
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AiOutlineExclamationCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No Bookings Found
            </h3>
            <p className="text-text-secondary mb-6">
              You haven't made any bookings yet.
            </p>
            <Button
              onClick={handleReturnHome}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-semibold"
            >
              Browse Tours
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Tour Image */}
                  <div className="md:w-1/3 lg:w-1/4">
                    <img
                      src={
                        booking.tour?.images?.[0] || "/api/placeholder/400/300"
                      }
                      alt={booking.tour?.name || "Tour image"}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>

                  {/* Booking Content */}
                  <div className="flex-1">
                    {/* Booking Header */}
                    <div className="bg-card-bg px-6 py-4 border-b border-zinc-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-text-normal">
                            {booking.tour?.name || "Tour Booking"}
                          </h3>
                          <p className="text-sm text-text-secondary mt-1">
                            Booking ID:{" "}
                            <span className="font-mono">{booking._id}</span>
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Traveler Information */}
                        <div>
                          <h4 className="text-sm font-medium text-text-secondary mb-2">
                            Traveler Information
                          </h4>
                          <p className="text-text-normal font-semibold">
                            {booking.fullName}
                          </p>
                          <p className="text-text-secondary text-sm">
                            {booking.phone}
                          </p>
                          <p className="text-text-secondary text-sm">
                            {booking.numberOfTravelers}{" "}
                            {booking.numberOfTravelers === 1
                              ? "Traveler"
                              : "Travelers"}
                          </p>
                        </div>

                        {/* Booking Details */}
                        <div>
                          <h4 className="text-sm font-medium text-text-secondary mb-2">
                            Booking Details
                          </h4>
                          <p className="text-text-normal text-sm">
                            <strong>Booked:</strong>{" "}
                            {formatDate(booking.bookedAt)}
                          </p>
                          <p className="text-text-normal text-sm">
                            <strong>Total:</strong>{" "}
                            {formatPrice(booking.totalPrice)}
                          </p>
                          <p className="text-text-normal text-sm">
                            <strong>StartAt:</strong>{" "}
                            {formatDate(booking.tour?.startDate)}
                          </p>
                        </div>

                        {/* Payment Status */}
                        <div>
                          <h4 className="text-sm font-medium text-text-secondary mb-2">
                            Payment Status
                          </h4>
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-600">
                            Paid
                          </span>
                          <p className="text-text-secondary text-sm mt-1">
                            Via Stripe
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-6 border-t border-zinc-200">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to={
                              role === "admin"
                                ? `/admin/tours/${booking.tour?._id}`
                                : `/tours/${booking.tour?._id}`
                            }
                            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded font-medium transition-colors"
                          >
                            View Tour
                          </Link>
                          {role === "user" && (
                            <Button
                              className="border cursor-pointer hover:bg-primary/20  border-zinc-200  text-text-normal px-4 py-2 rounded font-medium transition-colors"
                              onClick={() => downloadInvoice(booking)}
                            >
                              Download Invoice
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Special Requests */}
                      {booking.specialRequests && (
                        <div className="mt-6 pt-6 border-t border-zinc-200">
                          <h4 className="text-sm font-medium text-text-secondary mb-2">
                            Special Requests
                          </h4>
                          <p className="text-text-normal italic">
                            {booking.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-text-normal">
                  {bookings.length}
                </p>
                <p className="text-sm text-text-secondary">Total Bookings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(
                    bookings.reduce(
                      (total, booking) => total + booking.totalPrice,
                      0
                    )
                  )}
                </p>
                <p className="text-sm text-text-secondary">
                  Total {role === "user" ? "Spent" : "Received"}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {bookings.reduce(
                    (total, booking) => total + booking.numberOfTravelers,
                    0
                  )}
                </p>
                <p className="text-sm text-text-secondary">Total Travelers</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
