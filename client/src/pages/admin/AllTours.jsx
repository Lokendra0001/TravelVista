// src/pages/admin/AllTours.jsx
import React, { useEffect, useState } from "react";
import { Plus, Filter, Search, Download } from "lucide-react";
import { Link } from "react-router-dom";
import TourCard from "../../components/TourCard";
import axios from "axios";
import { SERVER_API, SUB_API } from "../../utils/serverApiConfig";

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
    <div className="relative min-h-screen ">
      {/* Background Image */}
      <div className="sticky top-16 h-80 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
          alt="Tour Management Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Tour Management</h1>
            <p className="text-xl">
              View and organize all your tour packages
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="p-6 bg-background z-10 relative rounded-tl-[5%] rounded-tr-[5%] -mt-15">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-15">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTours;
