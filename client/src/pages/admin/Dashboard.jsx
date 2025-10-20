// src/pages/AdminDashboard.jsx
import React from "react";
import useUser from "../../custom-hooks/useUser";
import {
  Users,
  Airplay,
  BookOpen,
  DollarSign,
  Plus,
  MapPin,
  Settings,
  TrendingUp,
  Calendar,
  Star,
  ChevronRight,
  Eye,
  Edit3,
  ArrowRight,
  Sparkles,
  Globe,
  Heart,
} from "lucide-react";

const AdminDashboard = () => {
  const { user, role, loading } = useUser();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  if (!user || role !== "admin")
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center p-8 bg-card-bg rounded-2xl border border-light-border">
          <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="text-danger w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Access Denied
          </h2>
          <p className="text-text-secondary">
            Administrator privileges required
          </p>
        </div>
      </div>
    );

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: "1,234",
      change: "+8.2%",
      color: "primary",
    },
    {
      icon: Airplay,
      label: "Active Tours",
      value: "56",
      change: "4.8 rating",
      color: "accent",
    },
    {
      icon: BookOpen,
      label: "Bookings",
      value: "789",
      change: "32 pending",
      color: "secondary",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "$45.2K",
      change: "+15.7%",
      color: "success",
    },
  ];

  const quickActions = [
    {
      icon: Plus,
      title: "Create Tour",
      description: "Add new destinations",
      color: "primary",
    },
    {
      icon: BookOpen,
      title: "Bookings",
      description: "Manage reservations",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Users",
      description: "Customer management",
      color: "accent",
    },
    {
      icon: MapPin,
      title: "Destinations",
      description: "Explore locations",
      color: "info",
    },
  ];

  return (
    <div className="h-auto bg-background">
      {/* Hero Section with Full Background Image */}
      <div className="relative h-96 overflow-hidden rounded-b-3xl">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        </div>

        {/* Floating Welcome Card */}
        <div className="relative z-10 max-w-4xl mx-auto pt-20 px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                <Sparkles className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-white/80 text-lg">
                  Ready to create amazing travel experiences today?
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>56 Active Tours</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>1,234 Happy Travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>12% Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl border border-light-border p-6 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium mb-2">
                    {stat.label}
                  </p>
                  <p className="text-text-primary text-2xl font-bold mb-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-${stat.color} text-sm flex items-center gap-1 font-medium`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 bg-${stat.color}/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`text-${stat.color} w-7 h-7`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="bg-gradient-to-br from-card-bg to-white rounded-3xl shadow-lg border border-light-border p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-2">
                Quick Actions
              </h2>
              <p className="text-text-secondary text-lg">
                Manage your travel business efficiently
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="group bg-white rounded-xl border-2 border-light-border hover:border-primary hover:shadow-xl transition-all duration-300 p-6 text-left"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 bg-${action.color}/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className={`text-${action.color} w-8 h-8`} />
                  </div>
                  <h3 className="text-text-primary font-bold text-lg mb-2">
                    {action.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
