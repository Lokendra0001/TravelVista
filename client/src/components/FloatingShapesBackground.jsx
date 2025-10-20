import React from "react";

const FloatingShapesBackground = ({ children }) => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Only 2 large rounded squares */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/5 rounded-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-secondary/5 rounded-3xl animate-float-medium"></div>
      </div>

      <div className="relative -z-50">{children}</div>
    </>
  );
};

export default FloatingShapesBackground;
