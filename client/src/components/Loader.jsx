// TravelVistaLoader.jsx
import React from "react";
import { Plane, MapPin, Route, MapPinned } from "lucide-react";

const TravelVistaLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Main loader */}
        <div className="relative">
          {/* Spinning ring */}
          <div className="w-24 h-24 border-4 border-light-border rounded-full">
            <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>

          {/* Central plane icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPinned className="w-9 h-9 text-primary animate-pulse" />
          </div>

          {/* Floating map pin */}
          <div className="absolute -bottom-1 -right-1">
            <Plane className="w-5 h-5 text-accent animate-bounce" />
          </div>
        </div>

        {/* Text with subtle animation */}
        <div className="text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-text-primary">Travel</span>
            <span className="text-2xl font-bold text-primary animate-pulse">
              Vista
            </span>
          </div>
          <p className="text-text-secondary text-sm mt-2">
            Loading your journey...
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelVistaLoader;
