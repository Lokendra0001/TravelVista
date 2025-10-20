import React from "react";
import { MapPin, IndianRupee, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const tourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-2xl  shadow-xl overflow-hidden border border-light-border transition-all duration-500 ">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={tour?.images?.[0]}
          alt={tour?.tourName}
          className="w-full h-70 object-cover transition-transform duration-700"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-text-primary">
            {tour?.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location and Price Row */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center text-text-secondary bg-background rounded-full  py-1">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="text-xs font-medium">{tour?.destination}</span>
          </div>
          <div className="text-right">
            <div className="flex items-center  font-bold text-primary">
              <IndianRupee className="w-4 h-4 mr-1" />
              {tour?.pricePerPerson.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-text-secondary mt-1">(per person)</div>
          </div>
        </div>

        {/* tour? Name */}
        <h2 className="text-lg font-bold text-text-primary mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {tour?.tourName}
        </h2>

        {/* Duration and Trip Row */}
        <div className="flex justify-between items-center pt-3 border-t border-light-border">
          <div className="flex items-center text-text-secondary bg-background rounded-full px-3 py-2">
            <Calendar className="w-4 h-4 mr-2 text-warning" />
            <span className="text-sm font-medium">{tour?.duration}</span>
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

export default tourCard;
