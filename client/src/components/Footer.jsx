import React from "react";
import { NavLink } from "react-router-dom";
import useUser from "../custom-hooks/useUser";
import {
  Home,
  MapPin,
  Plane,
  BookOpen,
  Calendar,
  Users,
  MapPinned,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const { user, role } = useUser();

  // --- Nav Links ---
  const adminLinks = [
    { path: "/admin", label: "Dashboard", icon: <Home size={16} /> },
    {
      path: "/admin/create-tour",
      label: "Create Tour",
      icon: <Plane size={16} />,
    },
    {
      path: "/admin/bookings",
      label: "Bookings",
      icon: <BookOpen size={16} />,
    },
    { path: "/admin/tours", label: "Tours", icon: <MapPinned size={16} /> },
  ];

  const userLinks = [
    { path: "/", label: "Home", icon: <Home size={16} /> },

    { path: "/tours", label: "Tours", icon: <Plane size={16} /> },
    { path: "/bookings", label: "Bookings", icon: <Calendar size={16} /> },
    { path: "/my-bookings", label: "My Trips", icon: <BookOpen size={16} /> },
  ];

  const navLinks = role === "admin" ? adminLinks : userLinks;

  return (
    <footer className="bg-zinc-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                <span className="text-background font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                TravelVista
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in exploring incredible India. Create
              unforgettable travel experiences.
            </p>
          </div>

          {/* Dynamic Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors duration-300 text-sm ${
                        isActive ? "text-primary font-medium" : ""
                      }`
                    }
                  >
                    <span className="w-4">{link.icon}</span>
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-primary">📞</span>
                <a
                  href="tel:+911800123456"
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  +91 1800-123-456
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary">✉️</span>
                <a
                  href="mailto:info@travelvista.com"
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  info@travelvista.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: <Facebook size={17} />, name: "Facebook" },
                { icon: <Instagram size={17} />, name: "Instagram" },
                { icon: <Twitter size={17} />, name: "Twitter" },
                { icon: <Linkedin size={17} />, name: "LinkedIn" },
                { icon: <Mail size={17} />, name: "Email" },
                { icon: <MessageCircle size={17} />, name: "WhatsApp" },
              ].map((link, index) => (
                <button
                  key={index}
                  className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors duration-300 text-sm text-zinc-400 hover:text-white"
                  title={link.name}
                >
                  {link.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-gray-400 mb-2 md:mb-0">
              © 2025 TravelVista. All rights reserved.
            </div>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
