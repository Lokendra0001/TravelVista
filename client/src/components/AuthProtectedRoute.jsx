import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ children }) => {
  const { user, role } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to={role === "admin" ? "/admin" : "/"} replace />;
  }

  return children;
};

export default AuthProtectedRoute;
