import React, { useState } from "react";
import {
  Mail,
  LockKeyhole,
  LogIn,
  Shield,
  Loader2,
  User,
  Settings,
} from "lucide-react";
import { useForm } from "react-hook-form";
import {Input, Button} from "../components/common/Index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/slices/authSlice/authSlice.thunk";
import { handleErrorMsg, handleSuccessMsg } from "../utils/toast";

const Signin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        signin({ ...data, role: isAdmin ? "admin" : "user" })
      ).unwrap();
      handleSuccessMsg(result?.msg);
      navigate(result?.user?.role === "admin" ? "/admin" : "/");
      reset();
    } catch (err) {
      handleErrorMsg(err?.response?.data?.msg || err);
    }
  };

  // Different images for user and admin
  const userImage =
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80";
  const adminImage =
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="min-h-screen flex justify-center items-center bg-background py-4 select-none">
      <div className="w-full max-w-[1000px] border border-zinc-200 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl">
        {/* Left Image Section */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <img
            src={isAdmin ? adminImage : userImage}
            alt={isAdmin ? "Admin Dashboard" : "Travel adventure"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                {isAdmin ? (
                  <Settings className="w-6 h-6" />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {isAdmin ? "Admin Portal" : "Welcome Back"}
                </h3>
                <p className="text-white/80 text-sm">
                  {isAdmin
                    ? "Manage your travel platform"
                    : "Continue your journey with us"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full bg-background md:rounded-l-4xl md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                  isAdmin ? "bg-zinc-700" : "bg-primary"
                }`}
              >
                {isAdmin ? (
                  <Settings className="w-7 h-7 text-white" />
                ) : (
                  <LogIn className="w-7 h-7 text-white" />
                )}
              </div>
            </div>
            <h2
              className={`text-2xl font-bold mb-1 ${
                isAdmin ? "text-gray-700" : "text-primary"
              }`}
            >
              {isAdmin ? "Admin Login" : "Welcome to TravelVista"}
            </h2>
            <p className="text-text-secondary text-sm">
              {isAdmin
                ? "Access your management dashboard"
                : "Sign in to your account"}
            </p>
          </div>

          {/* Role Toggle - Moved to more prominent position */}
          <div className="flex justify-center mb-6 select-none ">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                type="button"
                onClick={() => setIsAdmin(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer  duration-200 ${
                  !isAdmin
                    ? "bg-white text-gray-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Login
                </div>
              </button>
              <button
                type="button"
                onClick={() => setIsAdmin(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer duration-200 ${
                  isAdmin
                    ? "bg-zinc-700 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Admin Login
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              type="email"
              label="Email Address"
              placeholder={isAdmin ? "admin@travelvista.com" : "your@email.com"}
              icon={Mail}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              icon={LockKeyhole}
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : isAdmin
                  ? "bg-zinc-700 hover:bg-gray-700 cursor-pointer"
                  : "bg-primary hover:bg-primary-hover cursor-pointer"
              } py-3 rounded-lg w-full font-semibold text-sm text-white shadow-md hover:shadow-lg transition-all duration-300`}
              disabled={loading}
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    {isAdmin ? "Admin Sign In" : "Sign In"}
                  </>
                )}
              </div>
            </Button>
          </form>

          {/* Only show signup link for users, not admins */}
          {!isAdmin && (
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-text-secondary text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:text-primary-hover underline hover:no-underline transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          )}

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-text-secondary text-xs">
            <Shield className="w-3 h-3" />
            <span>Secure login protected by encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
