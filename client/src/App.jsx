import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/slices/authSlice/authSlice.thunk";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import HomePage from "./pages/user/HomePage";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginProtectedRoute from "./components/LoginProtectedRoute";
import Loader from "./components/Loader";
import DestinationPage from "./pages/admin/DestinationPage.jsx";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import CreateTour from "./pages/admin/CreateTour.jsx";
import AllTours from "./pages/admin/AllTours.jsx";
import Alltours from "./pages/user/Alltours.jsx";
import TourDetail from "./components/TourDetail.jsx";
import Profile from "./pages/admin/Profile.jsx";
import TourBooking from "./pages/user/TourBooking.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import MyBookings from "./pages/user/MyBooking.jsx";
import About from "./pages/user/About.jsx";

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
        { path: "/tours", element: <Alltours /> },
        { path: "/my-bookings", element: <MyBookings /> },
        { path: "/profile", element: <Profile /> },
        { path: "/about", element: <About /> },
        { path: "/payment-success", element: <PaymentSuccess /> },
        { path: "tours/:id", element: <TourDetail /> },
        { path: "tours/:id/booking", element: <TourBooking /> },
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
        { path: "", element: <AdminDashboard /> }, // Default admin page
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
        <LoginProtectedRoute>
          <Signin />
        </LoginProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <LoginProtectedRoute>
          <Signup />
        </LoginProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
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
