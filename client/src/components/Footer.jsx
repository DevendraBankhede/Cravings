import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logoCircle from "../assets/circleLogo.png";

const Footer = () => {
  const location = useLocation().pathname;
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  if (location.toLowerCase().includes("dashboard")) return null;

  return (
    <footer className="bg-(--color-neutral) text-(--color-neutral-content) py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Content Grid */}

        <p className="text-sm text-(--color-neutral-content) text-center mb-8">
          --- Your favorite food delivery platform connecting customers with
          restaurants and riders. ---
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* About Section */}
          <div>
            <img
              src={logoCircle}
              alt="Cravings Logo"
              className="mb-4 w-32 h-32"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/order-now")}
              >
                Order Now
              </li>
            </ul>
          </div>

          {/* For Restaurants */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Restaurants</h4>
            <ul className="space-y-2">
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/register/restaurant")}
              >
                Partner With Us
              </li>
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/restaurant-dashboard")}
              >
                Restaurant Dashboard
              </li>
            </ul>
          </div>

          {/* For Riders */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Riders</h4>
            <ul className="space-y-2">
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/register/rider")}
              >
                Become a Rider
              </li>
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/rider-dashboard")}
              >
                Rider Dashboard
              </li>
            </ul>
          </div>
          {/* Feedback & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Feedback & Support</h4>
            <ul className="space-y-2">
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/feedback")}
              >
                Submit Feedback
              </li>
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/help-center")}
              >
                Help Center
              </li>
              <li
                className="text-sm hover:text-(--color-primary) transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border(--color-neutral) my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-(--color-neutral-content) mb-4 md:mb-0">
            &copy; {currentYear} Cravings. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6">
            <Link to="/privacy-policy">
              <span className="text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                Privacy Policy
              </span>
            </Link>
            <Link to="/terms-of-service">
              <span className="text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                Terms of Service
              </span>
            </Link>
            <Link to="/site-map">
              <span className="text-sm text-(--color-neutral-content) hover:text-(--color-primary) transition-colors duration-200">
                Site Map
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;