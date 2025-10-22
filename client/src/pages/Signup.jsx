import React from "react";
import {
  User2Icon,
  Mail,
  LockKeyhole,
  LogIn,
  Globe,
  Shield,
  Star,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/common/Index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/authSlice/authSlice.thunk";
import { handleErrorMsg, handleSuccessMsg } from "../utils/toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(signup(data)).unwrap();
      handleSuccessMsg(result?.msg);
      console.log("Signup success:", result);
      reset();
    } catch (err) {
      handleErrorMsg(err?.response?.data?.msg || err);
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background py-5 ">
      <div className="w-full max-w-[1100px] bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')]  bg-no-repeat  border border-zinc-200 rounded-2xl overflow-hidden flex flex-col md:flex-row bg-background">
        {/* Left Image Section */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Travel adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Explore The India</h3>
                <p className="text-white/80 text-sm">
                  Join thousands of travelers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Expert Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Instant Booking</span>
              </div>
            </div>
          </div>

          <div className="absolute top-6 left-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex items-center gap-1 text-white text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>Trusted by 10K+ Travelers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full bg-background md:rounded-l-4xl md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <LogIn className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-1">
              Join TravelVista
            </h2>
            <p className="text-text-secondary text-sm">
              Create your account and start your adventure
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              label="Full Name"
              icon={User2Icon}
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Full Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              error={errors.fullName?.message}
            />

            <Input
              type="email"
              label="Email Address"
              icon={Mail}
              placeholder="your@email.com"
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
              icon={LockKeyhole}
              placeholder="Create a strong password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              error={errors.password?.message}
            />

            <div className="flex items-start gap-3 my-5 p-3 bg-primary/10 rounded-xl border border-primary">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-secondary">
                By creating an account, you agree to our{" "}
                <span className="text-primary font-semibold cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary font-semibold cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            <Button
              type="submit"
              className={`${
                loading
                  ? "bg-primary/15 text-black/45 cursor-not-allowed"
                  : " bg-primary hover:bg-primary-hover text-white  cursor-pointer"
              } py-3 rounded-lg w-full font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300`}
              disabled={loading}
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </div>
            </Button>
          </form>

          <div className="text-center mt-4 text-text-secondary text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-primary font-semibold hover:text-primary-hover underline"
            >
              Sign in
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-text-secondary text-xs">
            <Shield className="w-4 h-4" />
            <span>Your data is securely encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
