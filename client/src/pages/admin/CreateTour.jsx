// src/pages/admin/CreateTour.jsx
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Upload,
  MapPin,
  Calendar,
  Hotel,
  Car,
  Route,
  Star,
  Plus,
  Trash2,
  ArrowLeft,
  IndianRupee,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Select } from "../../components/common/Index";
import { SERVER_API, SUB_API } from "../../utils/serverApiConfig";

const CreateTour = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      tourName: "",
      destination: "",
      description: "",
      highlights: "",
      duration: "",
      pricePerPerson: "",
      category: "",
      hotel: {
        name: "",
        type: "",
        location: "",
        roomType: "",
        mealPlan: "",
      },
      transport: {
        mode: "",
        pickup: "",
        drop: "",
      },
      itinerary: [{ day: 1, title: "", activities: "" }],
      images: [],
      startDate: "",
      endDate: "",
      availableSeats: "",
      rating: "",
      isFeatured: false,
    },
  });

  const itinerary = watch("itinerary");

  const addItineraryDay = () => {
    const newDay = { day: itinerary.length + 1, title: "", activities: "" };
    setValue("itinerary", [...itinerary, newDay]);
  };

  const removeItineraryDay = (index) => {
    const updatedItinerary = itinerary.filter((_, i) => i !== index);
    const renumberedItinerary = updatedItinerary.map((item, idx) => ({
      ...item,
      day: idx + 1,
    }));
    setValue("itinerary", renumberedItinerary);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("images", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Basic Info
      formData.append("tourName", data.tourName);
      formData.append("destination", data.destination);
      formData.append("description", data.description);
      formData.append("highlights", data.highlights);
      formData.append("duration", data.duration);
      formData.append("pricePerPerson", data.pricePerPerson);
      formData.append("category", data.category);

      // Hotel Info
      formData.append("hotelName", data.hotel.name);
      formData.append("hotelType", data.hotel.type);
      formData.append("hotelLocation", data.hotel.location);
      formData.append("hotelRoomType", data.hotel.roomType);
      formData.append("hotelMealPlan", data.hotel.mealPlan);

      // Transport Info
      formData.append("transportMode", data.transport.mode);
      formData.append("transportPickup", data.transport.pickup);
      formData.append("transportDrop", data.transport.drop);

      // Itinerary
      formData.append("itinerary", JSON.stringify(data.itinerary));

      // Additional Info
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("availableSeats", data.availableSeats);
      formData.append("rating", data.rating || "");
      formData.append("isFeatured", data.isFeatured);

      // Images
      data.images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await axios.post(
        `${SERVER_API}${SUB_API.TOUR.CREATE}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      reset();
      setPreviewImages([]);
      navigate(`/admin/tours/${res?.data?.tourId}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center text-text-secondary hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Create New Tour
              </h1>
              <p className="text-text-secondary mt-2">
                Add a new exciting travel package to your offerings
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          encType="multipart/form-data"
        >
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-light-border p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Tour Name *"
                placeholder="e.g., Jaipur Heritage Tour"
                {...register("tourName", { required: "Tour name is required" })}
                error={errors.tourName?.message}
              />
              <Input
                label="Destination *"
                placeholder="e.g., Jaipur, Rajasthan"
                {...register("destination", {
                  required: "Destination is required",
                })}
                error={errors.destination?.message}
              />
              <div className="mb-4 w-full col-span-2">
                <label
                  htmlFor="highlights"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="Description"
                  placeholder="Key Description of the tour (e.g., Amber Fort visit, local food tasting)..."
                  rows={4}
                  className={`block w-full rounded-lg border p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary border-zinc-300`}
                  {...register("description", {
                    required: "Description are required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <Input
                label="Duration *"
                placeholder="e.g., 5 Days / 4 Nights"
                {...register("duration", { required: "Duration is required" })}
                error={errors.duration?.message}
              />
              <Input
                label="Price Per Person (₹) *"
                placeholder="1200"
                type="number"
                icon={IndianRupee}
                {...register("pricePerPerson", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                error={errors.pricePerPerson?.message}
              />
              <Select
                label="Category *"
                options={[
                  "heritage",
                  "nature",
                  "beach",
                  "adventure",
                  "spiritual",
                  "pilgrimage",
                ]}
                {...register("category", {
                  required: "Category  is required",
                })}
                error={errors.category?.message}
              />
            </div>
          </div>

          {/* Hotel Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-light-border p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center">
              <Hotel className="w-5 h-5 mr-2 text-accent" />
              Hotel Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Hotel Name *"
                placeholder="e.g., Taj Rambagh Palace"
                {...register("hotel.name", {
                  required: "Hotel name is required",
                })}
                error={errors.hotel?.name?.message}
              />
              <Select
                label="Hotel Type *"
                options={[
                  "3-Star",
                  "4-Star",
                  "5-Star",
                  "Resort",
                  "Boutique Hotel",
                  "Private Villa",
                ]}
                {...register("hotel.type", {
                  required: "Hotel type is required",
                })}
                error={errors.hotel?.type?.message}
              />
              <Input
                label="Hotel Location *"
                placeholder="e.g., Jaipur, Rajasthan"
                {...register("hotel.location", {
                  required: "Hotel location is required",
                })}
                error={errors.hotel?.location?.message}
              />
              <Select
                label="Room Type *"
                options={[
                  "Standard Room",
                  "Deluxe Room",
                  "Superior Room",
                  "Suite",
                  "Private Villa",
                ]}
                {...register("hotel.roomType", {
                  required: "Room type is required",
                })}
                error={errors.hotel?.roomType?.message}
              />
              <Select
                label="Meal Plan *"
                options={[
                  "Breakfast Only",
                  "Half Board",
                  "Full Board",
                  "All Inclusive",
                ]}
                {...register("hotel.mealPlan", {
                  required: "Meal plan is required",
                })}
                error={errors.hotel?.mealPlan?.message}
              />
            </div>
          </div>

          {/* Transport Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-light-border p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center">
              <Car className="w-5 h-5 mr-2 text-secondary" />
              Transport Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Transport Mode *"
                options={["Bus", "Flight", "Train", "Cruise", "Private Car"]}
                {...register("transport.mode", {
                  required: "Transport mode is required",
                })}
                error={errors.transport?.mode?.message}
              />
              <Input
                label="Pickup Location *"
                placeholder="e.g., Jaipur Airport, Hotel Lobby"
                {...register("transport.pickup", {
                  required: "Pickup location is required",
                })}
                error={errors.transport?.pickup?.message}
              />
              <Input
                label="Drop Location *"
                placeholder="e.g., Hotel, Jaipur Railway Station"
                {...register("transport.drop", {
                  required: "Drop location is required",
                })}
                error={errors.transport?.drop?.message}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl shadow-lg border border-light-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center">
                <Route className="w-5 h-5 mr-2 text-info" />
                Tour Itinerary
              </h2>
              <Button
                type="button"
                onClick={addItineraryDay}
                className="flex items-center space-x-2 bg-primary cursor-pointer hover:bg-primary-hover px-2 py-2 text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Add Day</span>
              </Button>
            </div>

            <div className="space-y-4">
              {itinerary.map((day, index) => (
                <div
                  key={index}
                  className="border border-light-border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary">
                      Day {day.day}
                    </h3>
                    {itinerary.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeItineraryDay(index)}
                        className="text-danger hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Day Title *"
                      placeholder="e.g., Arrival and Local Sightseeing"
                      {...register(`itinerary.${index}.title`, {
                        required: "Day title is required",
                      })}
                      error={errors.itinerary?.[index]?.title?.message}
                    />
                    <div className="md:col-span-2">
                      <label
                        htmlFor={`itinerary-${index}-activities`}
                        className="block text-sm font-medium text-text-primary mb-1"
                      >
                        Activities *
                      </label>
                      <textarea
                        id={`itinerary-${index}-activities`}
                        placeholder="e.g., Visit City Palace, try local Rajasthani cuisine..."
                        rows={3}
                        className={`block w-full rounded-lg border resize-none border-light-border p-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.itinerary?.[index]?.activities
                            ? "border-red-500"
                            : "border-light-border"
                        }`}
                        {...register(`itinerary.${index}.activities`, {
                          required: "Activities are required",
                        })}
                      />
                      {errors.itinerary?.[index]?.activities && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.itinerary[index].activities.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-light-border p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-warning" />
              Additional Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Start Date *"
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                error={errors.startDate?.message}
              />
              <Input
                label="End Date *"
                type="date"
                {...register("endDate", { required: "End date is required" })}
                error={errors.endDate?.message}
              />
              <Input
                label="Available Seats *"
                type="number"
                placeholder="e.g., 20"
                {...register("availableSeats", {
                  required: "Available seats is required",
                  min: { value: 1, message: "Must have at least 1 seat" },
                })}
                error={errors.availableSeats?.message}
              />
              <Input
                label="Rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                icon={Star}
                {...register("rating")}
                placeholder="4.5"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-lg border border-light-border p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-success" />
              Tour Images
            </h2>

            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-4">
                {previewImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded-lg border border-light-border"
                  />
                ))}
              </div>
            )}

            <div className="border-2 border-dashed flex flex-col items-center border-light-border rounded-xl p-8 text-center relative">
              <Upload className="w-12 h-12 text-text-secondary mx-auto mb-4" />
              <p className="text-text-primary font-medium mb-2">
                Upload tour images
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 w-full h-full  cursor-pointer"
              />
              <p className="text-sm text-gray-500">
                Click one time & select all images! (ctrl + click)
              </p>

              {watch("images").length <= 0 && (
                <p className="text-red-500 text-sm mt-1">
                  At least one image required! (1 - 10)
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button className={"text-red-400"} onClick={() => reset()}>
              Cancel
            </Button>
            <Button
              type="submit"
              className={`px-2 py-2 ${
                loading
                  ? "bg-zinc-200 text-zinc-500 cursor-not-allowed animate-pulse"
                  : "bg-primary text-white cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "Creating Tour..." : <>Create Tour</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTour;
