import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/Apiconfig";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";
import defaultRestaurantImage from "../assets/Samplerestaurant.jpg";
import heroBg from "../assets/carousel/bgImage1.jpg";
import {
  IoSearch,
  IoLocationOutline,
  IoTimeOutline,
  IoStar,
  IoStorefrontOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { FaLeaf, FaDrumstickBite, FaUtensils } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";

const RESTAURANT_TYPES = [
  { value: "all", label: "All" },
  { value: "veg", label: "Veg", icon: <FaLeaf className="text-green-500" /> },
  {
    value: "non-veg",
    label: "Non-Veg",
    icon: <FaDrumstickBite className="text-red-500" />,
  },
  {
    value: "vegan",
    label: "Vegan",
    icon: <FaLeaf className="text-green-600" />,
  },
  {
    value: "jain",
    label: "Jain",
    icon: <FaLeaf className="text-orange-500" />,
  },
  {
    value: "both",
    label: "Veg & Non-Veg",
    icon: <MdOutlineRestaurantMenu className="text-purple-500" />,
  },
];

const typeStyles = {
  veg: "bg-green-50 text-green-700 border-green-200",
  "non-veg": "bg-red-50 text-red-700 border-red-200",
  vegan: "bg-green-50 text-green-800 border-green-200",
  jain: "bg-orange-50 text-orange-700 border-orange-200",
  both: "bg-purple-50 text-purple-700 border-purple-200",
};

const typeLabels = {
  veg: "Pure Veg",
  "non-veg": "Non-Veg",
  vegan: "Vegan",
  jain: "Jain",
  both: "Veg & Non-Veg",
};

const OrderNow = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/public/restaurants");
      setRestaurants(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during fetching restaurants. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        r.restaurantName?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.city?.toLowerCase().includes(q) ||
        r.cuisineTypes?.some((c) => c.toLowerCase().includes(q));
      const matchType =
        selectedType === "all" || r.restaurantType === selectedType;
      const matchOpen = !showOpenOnly || r.isOpen;
      return matchSearch && matchType && matchOpen;
    });
  }, [restaurants, searchQuery, selectedType, showOpenOnly]);

  if (isLoading) return <Loader height="100vh" width="100%" />;

  return (
    <div className="min-h-screen bg-(--color-base-200)">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden min-h-72 md:min-h-80 flex items-center justify-center text-center px-5 py-16">
        {/* Background image */}
        <img
          src={heroBg}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />

        {/* Floating food icons */}
        <FaUtensils className="absolute top-8 left-10 text-white/10 text-6xl rotate-12 hidden md:block" />
        <MdOutlineRestaurantMenu className="absolute bottom-10 right-14 text-white/10 text-7xl -rotate-12 hidden md:block" />
        <FaLeaf className="absolute top-12 right-24 text-white/10 text-5xl rotate-6 hidden md:block" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-(--color-primary) bg-white/90 px-3 py-1 rounded-full mb-4 shadow">
            <TbToolsKitchen2 className="text-sm" />
            Cravings — Order Now
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg mb-3">
            Hungry? <span className="text-(--color-warning)">We've got you.</span>
          </h1>
          <p className="text-sm md:text-base text-white/75 mb-8 leading-relaxed">
            Discover the best restaurants around you and get your favourite meal
            delivered fresh.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-secondary) text-lg" />
            <input
              type="text"
              placeholder="Search by name, cuisine or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm bg-white text-(--color-base-content) shadow-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary)/50"
            />
          </div>

          {/* Quick stat pills */}
          {restaurants.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/20">
                <IoStorefrontOutline />
                {restaurants.length} Restaurants
              </span>
              <span className="flex items-center gap-1.5 text-xs bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/20">
                <IoCheckmarkCircleOutline className="text-green-400" />
                {restaurants.filter((r) => r.isOpen).length} Open Now
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────── */}
      <div className="sticky top-16 z-10 bg-(--color-base-100) border-b border-(--color-base-300) shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-3 flex flex-wrap items-center gap-2">
          {RESTAURANT_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition font-medium ${
                selectedType === type.value
                  ? "bg-(--color-primary) text-(--color-primary-content) border-(--color-primary)"
                  : "bg-white text-(--color-base-content) border-(--color-base-300) hover:border-(--color-primary)"
              }`}
            >
              {type.icon}
              {type.label}
            </button>
          ))}

          <label className="ml-auto flex items-center gap-2 text-xs font-medium text-(--color-base-content) cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOpenOnly}
              onChange={(e) => setShowOpenOnly(e.target.checked)}
              className="accent-(--color-primary) w-3.5 h-3.5"
            />
            Open Now
          </label>

          <span className="text-xs text-(--color-secondary)">
            {filteredRestaurants.length} restaurant
            {filteredRestaurants.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 py-7">
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant._id}
                onClick={() =>
                  navigate(`/restaurant-details/${restaurant._id}`)
                }
                className="bg-(--color-base-100) rounded-2xl overflow-hidden border border-(--color-base-300) shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
              >
                {/* Cover Image */}
                <div className="relative w-full h-48 overflow-hidden bg-(--color-base-300)">
                  <img
                    src={restaurant?.coverImage?.url || defaultRestaurantImage}
                    alt={restaurant.restaurantName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Open / Closed */}
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      restaurant.isOpen
                        ? "bg-green-500 text-white"
                        : "bg-black/60 text-white"
                    }`}
                  >
                    {restaurant.isOpen ? "● Open" : "● Closed"}
                  </span>

                  {/* Rating */}
                  {restaurant.averageRating > 0 && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      <IoStar className="text-[11px]" />
                      {restaurant.averageRating.toFixed(1)}
                    </span>
                  )}

                  {/* Restaurant Type */}
                  {restaurant.restaurantType && (
                    <span
                      className={`absolute bottom-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        typeStyles[restaurant.restaurantType] ||
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {typeLabels[restaurant.restaurantType] ||
                        restaurant.restaurantType}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <h2 className="text-base font-bold text-(--color-base-content) truncate mb-0.5">
                    {restaurant.restaurantName}
                  </h2>

                  <p className="text-xs text-(--color-secondary) line-clamp-2 mb-3 leading-relaxed">
                    {restaurant.description || "No description available."}
                  </p>

                  {/* Cuisine types */}
                  {restaurant.cuisineTypes?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {restaurant.cuisineTypes.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="text-[10px] px-2 py-0.5 bg-(--color-base-200) text-(--color-secondary) rounded-full border border-(--color-base-300)"
                        >
                          {c}
                        </span>
                      ))}
                      {restaurant.cuisineTypes.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 bg-(--color-base-200) text-(--color-secondary) rounded-full border border-(--color-base-300)">
                          +{restaurant.cuisineTypes.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center justify-between text-xs text-(--color-secondary) border-t border-(--color-base-300) pt-3 gap-2">
                    {(restaurant.city || restaurant.address) && (
                      <span className="flex items-center gap-1 truncate">
                        <IoLocationOutline className="shrink-0" />
                        {restaurant.city || restaurant.address}
                      </span>
                    )}
                    {restaurant.servingHours?.openingTime && (
                      <span className="flex items-center gap-1 shrink-0">
                        <IoTimeOutline className="shrink-0" />
                        {restaurant.servingHours.openingTime} –{" "}
                        {restaurant.servingHours.closingTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound height="60vh" width="100%" text="No Restaurants Found" />
        )}
      </div>
    </div>
  );
};

export default OrderNow;