import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/slices/authSlice/authSlice.thunk";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import LoginProtectedRoute from "./components/LoginProtectedRoute";
import Loader from "./components/Loader";
import DestinationPage from "./pages/DestinationPage.JSX";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    // console.log("HELLO");
  }, []);

  // if (loading) return <Loader />;

  // Define routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [{ path: "/", element: <HomePage /> }],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <HomePage /> }, // Default admin page
        { path: "destination", element: <HomePage /> }, // /admin/destination
      ],
    },
    {
      path: "/signin",
      element: (
        <LoginProtectedRoute>
          <Signin />{" "}
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
          duration: 3000,
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
