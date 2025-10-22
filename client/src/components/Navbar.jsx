import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Home,
  MapPin,
  Plane,
  BookOpen,
  Calendar,
  Users,
  MapPinned,
  Info,
} from "lucide-react";
import { RiMenu3Fill } from "react-icons/ri";

import useUser from "../custom-hooks/useUser";
import LogoutBtn from "./LogoutBtn";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { user, role } = useUser();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // dispatch(logout());
    navigate("/signin");
  };

  // --- Nav Links ---
  const adminLinks = [
    { path: "/admin", label: "Dashboard", icon: <Home size={17} /> },
    {
      path: "/admin/create-tour",
      label: "Create Tour",
      icon: <Plane size={17} />,
    },
    {
      path: "/admin/bookings",
      label: "Bookings",
      icon: <BookOpen size={17} />,
    },
    { path: "/admin/tours", label: "Tours", icon: <MapPinned size={17} /> },
  ];

  const userLinks = [
    { path: "/", label: "Home", icon: <Home size={17} /> },
    { path: "/about", label: "About", icon: <Info size={17} /> },
    { path: "/tours", label: "Tours", icon: <Plane size={17} /> },
    { path: "/my-bookings", label: "My Trips", icon: <BookOpen size={17} /> },
  ];

  const navLinks = role === "admin" ? adminLinks : userLinks;

  return (
    <nav
      className={`w-full z-50 bg-background  transition-all duration-300 ${
        role === "user" && isHome
          ? scrolled
            ? "bg-background shadow-xs fixed top-0"
            : "bg-transparent shadow-none fixed top-0"
          : "sticky top-0 shadow-xs "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to={role === "admin" ? "/admin" : "/"}
          className="flex items-center space-x-2 group"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
            <span className="text-background font-bold text-xl">T</span>
          </div>
          <span className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
            TravelVista
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-3">
          {user ? (
            <>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-background shadow-md"
                        : "text-text-primary hover:text-primary hover:bg-card-bg"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}

              {/* Profile Dropdown */}
              <div className="relative ml-3">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-card-bg px-3 py-1.5 rounded-lg hover:bg-primary/10 border border-light-border transition"
                >
                  <div className="w-7 h-7 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <img
                      src={user?.profilePic}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <span className="text-text-primary font-medium text-sm">
                    {user?.fullName?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0  mt-3 w-48 px-1 bg-background rounded-xl shadow-lg border border-light-border py-2 z-50 ">
                    <NavLink
                      to={role == "admin" ? "/admin/profile" : "/profile"}
                      className="flex items-center space-x-2 px-4 py-2 text-text-primary rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-300 hover:pl-6"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </NavLink>
                    <LogoutBtn
                      classname={
                        "text-danger hover:bg-danger/5 px-4 rounded-xl hover:pl-6"
                      }
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <NavLink
                to="/signin"
                className="px-4 py-1.5 text-text-primary font-medium hover:text-primary transition"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-1.5 bg-primary text-background rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-text-primary hover:bg-card-bg transition"
          >
            {isMenuOpen ? <X size={26} /> : <RiMenu3Fill size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-light-border py-3 px-4 space-y-2  w-full   z-40 h-fit shadow-lg overflow-y-auto">
          {user ? (
            <>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-3 rounded-lg font-medium ${
                      isActive
                        ? "bg-primary text-background"
                        : "text-text-primary hover:bg-card-bg"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}

              <NavLink
                to="/profile"
                className="flex items-center gap-2 px-4 py-3 text-text-primary hover:bg-card-bg rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={17} />
                <span>Profile</span>
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-danger hover:bg-danger/10 rounded-lg"
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className="block px-4 py-3 text-text-primary hover:bg-card-bg rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="block px-4 py-3 bg-primary text-background rounded-lg font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}

      {/* Overlay */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
