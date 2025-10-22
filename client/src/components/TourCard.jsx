import React from "react";
import { MapPin, Star, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white  rounded-xl shadow-md overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour?.images?.[1]}
          alt={tour?.tourName}
          className="w-full h-full object-cover transition-transform duration-300"
        />

        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-text-secondary hover:text-red-500" />
        </button>
        <div className="absolute flex items-center bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
          <Clock className="w-3 h-3 inline mr-1" />
          {tour?.duration}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {tour?.tourName}
          </h3>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{tour?.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-text-secondary text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {tour?.destination}
        </div>

        <p className="text-text-secondary text-sm mb-4 h-[2.25rem] overflow-hidden">
          {tour?.description}
        </p>

        <div className="flex items-center justify-between border-t border-light-border pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              ₹{tour?.pricePerPerson?.toLocaleString()}
            </span>
          </div>
          <Link
            to={`${tour?._id}`}
            className="bg-primary cursor-pointer  text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-primary-hover transition-colors duration-300"
          >
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
