import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />; // Show loader only for protected pages

  if (!user) return <Navigate to="/signin" replace />;

  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
