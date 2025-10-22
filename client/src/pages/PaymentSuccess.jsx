import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
  Phone,
  User,
  MapPin,
  Users,
  IndianRupee,
} from "lucide-react";
import { SERVER_API, SUB_API } from "../utils/serverApiConfig";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const session_id = params.get("session_id");

  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState(null);

  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return; // skip if already ran
    ranOnce.current = true;

    if (!session_id) {
      setStatus("error");
      setMessage("No session ID found");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.post(
          `${SERVER_API}${SUB_API.BOOKING.CREATE}`,
          { sessionId: session_id },
          { withCredentials: true }
        );
        const data = res.data;
        if (data.booking) {
          setBooking(data.booking);
          setStatus("success");
          setMessage(data.msg);
        } else {
          setStatus("error");
          setMessage(data.msg || "Payment verification failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Payment verification failed");
      }
    };
    verify();
  }, []);

  useEffect(() => {
    if (status === "success") {
      window.history.replaceState({}, document.title, "/payment-success");
    }
  }, [status]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md border border-gray-200 text-gray-800">
        {/* Processing */}
        {status === "processing" && (
          <div className="flex flex-col items-center text-center space-y-4">
            <Loader2 className="w-14 h-14 text-primary animate-spin" />
            <h2 className="text-xl font-bold">Processing Payment</h2>
            <p className="text-gray-500">Please wait a moment...</p>
          </div>
        )}

        {/* Success */}
        {status === "success" && (
          <div className="text-center animate-fade-in space-y-5">
            <div className="flex justify-center">
              <div className="bg-green-500 rounded-full p-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful!
            </h2>
            <p className="text-gray-500">{message}</p>

            {booking && (
              <div className="mt-6 bg-gray-50 rounded-xl p-5 text-left shadow-inner border border-gray-200">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" />
                  Booking Details
                </h3>

                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" />{" "}
                    {booking.fullName}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary" /> {booking.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary" />{" "}
                    {booking.numberOfTravelers} Travelers
                  </p>
                  <p className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-secondary" />{" "}
                    {formatPrice(booking.totalPrice)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary" />{" "}
                    {formatDate(booking.bookedAt)}
                  </p>
                  {booking.specialRequests && (
                    <p className="italic text-gray-500">
                      “{booking.specialRequests}”
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/my-bookings")}
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-5 rounded-lg transition-all"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate("/")}
                className="border border-gray-300 hover:border-primary text-gray-800 font-semibold py-2 px-5 rounded-lg transition-all"
              >
                Return Home
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="text-center space-y-5">
            <div className="flex justify-center">
              <div className="bg-red-500 rounded-full p-4">
                <XCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
            <p className="text-gray-500">{message}</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="border border-gray-300 hover:border-red-500 text-gray-800 font-semibold py-2 px-5 rounded-lg transition-all"
              >
                Return Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
