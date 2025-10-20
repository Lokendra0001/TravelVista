// src/pages/admin/AllTours.jsx
import React, { useEffect, useState } from "react";
import { Plus, Filter, Search, Download } from "lucide-react";
import { Link } from "react-router-dom";
import TourCard from "../../components/TourCard";
import axios from "axios";
import { SERVER_API, SUB_API } from "../../utils/serverApiConfig";

const sampleTours = [
  {
    id: 1,
    name: "Golden Triangle Tour",
    destination: "Delhi, Agra, Jaipur",
    price: 35000,
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    bookings: 1247,
    startDate: "2025-11-01",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 2,
    name: "Kerala Backwaters Experience",
    destination: "Alleppey, Kumarakom",
    price: 28000,
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    bookings: 892,
    startDate: "2025-11-05",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1580610447943-1bfbef5efe07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },
  {
    id: 3,
    name: "Rajasthan Desert Safari",
    destination: "Jaisalmer, Jodhpur",
    price: 40000,
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    bookings: 756,
    startDate: "2025-11-10",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1459745930869-b3d0d72c3cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqYXN0aGFuJTIwZGVzZXJ0fGVufDB8fDB8fHww&w=1000&q=80",
  },
  {
    id: 4,
    name: "Himalayan Trekking Expedition",
    destination: "Manali, Leh, Ladakh",
    price: 52000,
    duration: "10 Days / 9 Nights",
    rating: 4.9,
    bookings: 634,
    startDate: "2025-11-15",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1581888226759-7d7022c9be1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGltYWxheWFzfGVufDB8fDB8fHww&w=1000&q=80",
  },
  {
    id: 5,
    name: "Goa Beach Paradise",
    destination: "North Goa, South Goa",
    price: 22000,
    duration: "4 Days / 3 Nights",
    rating: 4.6,
    bookings: 1567,
    startDate: "2025-11-08",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 6,
    name: "Cultural South India",
    destination: "Chennai, Madurai, Pondicherry",
    price: 38000,
    duration: "8 Days / 7 Nights",
    rating: 4.7,
    bookings: 543,
    startDate: "2025-11-12",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1593693397690-1d4b3c9c1c1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291dGglMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },
];

const AllTours = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const res = await axios.get(
          `${SERVER_API}${SUB_API.TOUR.GET_ALL_TOURS}`,
          { withCredentials: true }
        );
        setTours(res?.data?.tours);
        console.log(res?.data?.tours);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTours();
  }, []);

  if (tours?.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            No Tours Created Yet
          </h2>
          <p className="text-text-secondary mb-8">
            Start building your tour collection by creating your first amazing
            tour package.
          </p>
          <Link
            to="/admin/create-tour"
            className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Create Your First Tour
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              All Tours
            </h1>
            <p className="text-text-secondary">
              Manage {tours.length} tour packages in your system
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/admin/create-tour"
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add New Tour
            </Link>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-10 lg:gap-15">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTours;
