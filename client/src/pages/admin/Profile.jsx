import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  LogOut,
  User,
  Mail,
  Camera,
  Save,
  X,
  Shield,
  Calendar,
} from "lucide-react";
import { Input, Button, LogoutBtn } from "../../components/common/Index.jsx";
import useUser from "../../custom-hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/authSlice/authSlice.thunk.js";
import { handleErrorMsg, handleSuccessMsg } from "../../utils/toast";

const Profile = () => {
  const { user, role } = useUser();
  const { loading } = useSelector((state) => state.auth); // loading state
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [profileFile, setProfileFile] = useState(null);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      role: role || "",
    },
  });

  // Update form values when user changes
  useEffect(() => {
    setValue("fullName", user?.fullName || "");
    setValue("email", user?.email || "");
    setProfilePic(user?.profilePic || "");
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setProfileFile(file);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setProfilePic(user?.profilePic || "");
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      if (profileFile) formData.append("profilePic", profileFile);

      const res = await dispatch(updateUser(formData)).unwrap();
      setIsEditing(false);
      handleSuccessMsg(res?.msg);
    } catch (err) {
      handleErrorMsg(err);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-3">
            Admin Profile
          </h1>
          <p className="text-text-secondary text-lg">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-light-border p-6 sticky top-25">
              {/* Profile Picture */}
              <div className="relative group text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary-hover transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("profilePic")}
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {user?.fullName || ""}
                  </h2>
                  <p className="text-text-secondary flex items-center justify-center gap-2 mt-1">
                    <Shield className="w-4 h-4" />
                    {user?.role || ""}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user?.email || ""}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Joined {formatDate(user?.createdAt)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isEditing ? (
                  <Button
                    disabled={loading}
                    className="w-full py-2 cursor-pointer bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary-hover transition-all duration-300"
                    onClick={() => setIsEditing(true)}
                  >
                    <User className="w-5 h-5" /> Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      form="profile-form"
                      disabled={loading}
                      className="w-full py-2 cursor-pointer bg-green-700 text-white flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      {loading ? (
                        "Updating..."
                      ) : (
                        <>
                          <Save className="w-5 h-5" /> Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      className="w-full py-2 cursor-pointer bg-danger text-white flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-300"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      <X className="w-5 h-5" /> Cancel
                    </Button>
                  </>
                )}

                <LogoutBtn
                  classname={
                    "bg-danger/80 text-white hover:bg-red-500 justify-center rounded-md"
                  }
                />
              </div>
            </div>
          </div>

          {/* Right Content - Edit Form */}
          <div className="lg:col-span-2">
            <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white rounded-2xl shadow-xl border border-light-border p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-primary" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name
                    </label>
                    <Input
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "At least 2 characters",
                        },
                      })}
                      placeholder="Enter your full name"
                      readOnly={!isEditing}
                    />
                    {errors.fullName && (
                      <p className="text-danger text-sm mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address
                    </label>
                    <Input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="Enter your email"
                      readOnly={!isEditing}
                    />
                    {errors.email && (
                      <p className="text-danger text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Role
                    </label>
                    <Input value={user?.role || ""} readOnly icon={Shield} />
                  </div>

                  {/* Account Created */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Account Created
                    </label>
                    <label>{formatDate(user?.createdAt)}</label>
                  </div>

                  {/* Last Updated */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Last Updated
                    </label>
                    <label>{formatDate(user?.updatedAt)}</label>
                  </div>
                </div>

                {/* Security Note */}
                {!isEditing && (
                  <div className="mt-8 pt-6 border-t border-light-border">
                    <h4 className="text-lg font-semibold text-text-primary mb-4">
                      Account Security
                    </h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-yellow-800 text-sm">
                        <strong>Note:</strong> Password changes require
                        additional verification. Contact system admin to update.
                        (Future Update)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
