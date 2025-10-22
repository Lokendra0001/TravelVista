import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import { fetchCurrentUser } from "./redux/slices/authSlice/authSlice.thunk";
import {
  ProtectedRoute,
  AuthProtectedRoute,
  TourDetail,
} from "./components/Index.jsx";
import { Loader } from "./components/common/Index.jsx";

import { Signin, Signup, PaymentSuccess } from "./pages/Index.jsx";

import {
  Dashboard,
  CreateTour,
  AllTours,
  Profile,
} from "./pages/admin/Index.jsx";

import {
  HomePage,
  AllToursUser,
  TourBooking,
  MyBookings,
  About,
} from "./pages/user/Index.jsx";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // local state loader

  useEffect(() => {
    const loadUser = async () => {
      try {
        await dispatch(fetchCurrentUser()).unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // hide loader after fetch completes
      }
    };

    loadUser();
  }, []);

 

  if (loading) return <Loader />; // show loader only during first fetch

  // Define routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute requiredRole="user">
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/tours", element: <AllToursUser /> },
        { path: "/my-bookings", element: <MyBookings /> },
        { path: "/profile", element: <Profile /> },
        { path: "/about", element: <About /> },
        { path: "/payment-success", element: <PaymentSuccess /> },
        { path: "tours/:id", element: <TourDetail /> },
        { path: "tours/:id/booking", element: <TourBooking /> },
        { path: "/:id", element: <TourDetail /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Dashboard /> }, // Default admin page
        { path: "create-tour", element: <CreateTour /> }, // /admin/destination
        { path: "tours", element: <AllTours /> }, // /admin/destination
        { path: "bookings", element: <MyBookings /> }, // /admin/destination
        { path: "profile", element: <Profile /> }, // /admin/destination
        { path: "tours/:id", element: <TourDetail /> }, // /admin/destination
      ],
    },
    {
      path: "/signin",
      element: (
        <AuthProtectedRoute>
          <Signin />
        </AuthProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthProtectedRoute>
          <Signup />
        </AuthProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
          style: {
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "13px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            color: "#fff",
            background: "#374151",
          },
        }}
      />
    </>
  );
}

export default App;
