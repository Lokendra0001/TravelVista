import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useUser from "../custom-hooks/useUser";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useUser();

  // if (loading) return <Loader />;

  // Redirect to signin if not logged in
  if (!user) return <Navigate to="/signin" replace />;

  // Redirect if role doesn't match
  if (requiredRole && role !== requiredRole)
    return <Navigate to={role === "admin" ? "/admin" : "/"} replace />;

  // Render the protected content
  return children;
};

export default ProtectedRoute;
