import React from "react";

const Container = ({ children, classname }) => {
  return (
    <div className={`max-w-7xl w-full mx-auto ${classname} `}>{children}</div>
  );
};

export default Container;
