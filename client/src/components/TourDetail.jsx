import React, { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Calendar,
  IndianRupee,
  Hotel,
  Car,
  Route,
  Users,
  Clock,
  Utensils,
  Wifi,
  Shield,
  Heart,
  Share2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_API, SUB_API } from "../utils/serverApiConfig";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState("");
  const [activeTab, setActiveTab] = useState("information");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchCurrentTour = async () => {
      try {
        const res = await axios.get(
          `${SERVER_API}${SUB_API.TOUR.GET_TOUR}${id}`,
          {
            withCredentials: true,
          }
        );
        setTour(res?.data?.tour);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentTour();
  }, [id]);

  if (!tour)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-primary">Loading tour details...</p>
        </div>
      </div>
    );

  const tabs = [
    { id: "information", label: "Information", icon: Shield },
    { id: "tour-plan", label: "Tour Plan", icon: Route },
    { id: "gallery", label: "Gallery", icon: Hotel },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "information":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hotel Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  Accommodation Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Hotel Name :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {tour.hotelName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Hotel Type :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {tour.hotelType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Room Type :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {tour.hotelRoomType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Meal Plan :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {tour.hotelMealPlan}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Location :
                    </span>
                    <span className="text-text-primary font-semibold text-right">
                      {tour.hotelLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transport Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  Transportation Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Transport Mode :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {tour.transportMode}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Pickup Location :
                    </span>
                    <span className="text-text-primary font-semibold text-right">
                      {tour.transportPickup}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Drop Location :
                    </span>
                    <span className="text-text-primary font-semibold text-right">
                      {tour.transportDrop}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Available Seats :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {tour.availableSeats}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Tour Duration :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {tour.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Dates & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  Tour Schedule
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Start Date :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {new Date(tour.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      End Date :
                    </span>
                    <span className="text-text-primary font-semibold">
                      {new Date(tour.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  Pricing Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Price Per Person :
                    </span>
                    <span className="text-text-primary font-semibold flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      {tour.pricePerPerson?.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <span className="text-text-secondary font-medium">
                      Tour Rating :
                    </span>
                    <span className="flex items-center text-warning font-semibold">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {tour.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Description */}
            <div className="bg-background rounded-2xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                About This Tour :
              </h3>
              <pre className="w-full whitespace-pre-wrap break-words text-text-secondary leading-tight line-clamp-[20] md:line-clamp-none  font-[system-ui] font-medium ">
                {tour.description}
              </pre>
            </div>
          </div>
        );

      case "tour-plan":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">
              Detailed Itinerary
            </h3>
            <div className="space-y-4">
              {tour.itinerary?.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-background rounded-2xl p-6 border border-light-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 px-5 py-2.5 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-text-primary mb-2">
                        Day {idx + 1} : {day.title}
                      </h4>
                      <p className="text-text-secondary leading-relaxed">
                        {day.activities}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-text-secondary">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Full Day
                        </div>
                        <div className="flex items-center gap-1">
                          <Utensils className="w-4 h-4" />
                          Breakfast & Dinner
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-text-primary">
              Tour Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tour.images?.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">
                {tour.tourName}
              </h1>
              <div className="flex items-center gap-4 text-text-secondary">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="text-lg">{tour.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">{tour.rating} Rating</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  isFavorite
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-light-border text-text-secondary hover:text-primary"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-3 rounded-xl bg-white border border-light-border text-text-secondary hover:text-primary transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-2 border border-light-border">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-primary text-white shadow-lg"
                          : "text-text-secondary hover:text-primary hover:bg-background"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-light-border">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="space-y-6 h-full">
            {/* Price Card */}
            <div className="sticky top-20 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-light-border  ">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-text-primary flex items-center justify-center gap-2">
                    <IndianRupee className="w-6 h-6" />
                    {tour.pricePerPerson?.toLocaleString("en-IN")}
                  </div>
                  <div className="text-text-secondary">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Calendar className="w-4 h-4" />
                      <span>Start Date</span>
                    </div>
                    <span className="font-semibold text-text-primary">
                      {new Date(tour.startDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Clock className="w-4 h-4" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold text-text-primary">
                      {tour.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-background rounded-xl">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Users className="w-4 h-4" />
                      <span>Available Seats</span>
                    </div>
                    <span className="font-semibold text-text-primary">
                      {tour.availableSeats}
                    </span>
                  </div>
                </div>

                {/* <button className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary-hover transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 mb-4">
                Book Now
              </button> */}

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-warning mb-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">
                      {tour.rating} Excellent
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    Based on 120+ reviews
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-light-border">
                <h3 className="font-bold text-lg mb-4 text-text-primary">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">📞</span>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Call Us</div>
                      <div className="font-semibold text-text-primary">
                        +91 98765 43210
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">💬</span>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">
                        Chat with us
                      </div>
                      <div className="font-semibold text-text-primary">
                        24/7 Available
                      </div>
                    </div>
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

export default TourDetail;
