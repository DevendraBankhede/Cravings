import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch, IoStar } from "react-icons/io5";
import {
  MdRestaurant,
  MdLocalDining,
  MdFastfood,
  MdCake,
  MdLunchDining,
} from "react-icons/md";
import CarouselComponent from "../components/CarouselComponent";
import { useAuth } from "../context/AuthContext";
import api from "../config/Apiconfig";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All", icon: MdRestaurant },
    { id: "veg", label: "Vegetarian", icon: MdLocalDining },
    { id: "nonveg", label: "Non-Veg", icon: MdFastfood },
    { id: "dessert", label: "Desserts", icon: MdCake },
    { id: "others", label: "Others", icon: MdLunchDining },
  ];

  // Load restaurants from API
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const response = await api.get("/public/restaurants");

        // Map API response to match component's expected format
        const formattedRestaurants = response.data.data.map((restaurant) => ({
          id: restaurant._id,
          name: restaurant.restaurantName,
          description:
            restaurant.description ||
            `${restaurant.cuisineType} cuisine in ${restaurant.city}`,
          rating: restaurant.rating || 0,
          numReviews: restaurant.numReviews || 0,
          image:
            restaurant.images?.[0]?.URL ||
            "https://placehold.co/300x200?text=Restaurant",
          cuisines: restaurant.cuisineType,
          geolocation: restaurant.geolocation,
          city: restaurant.city,
          address: restaurant.address,
          openingHours: restaurant.openingHours,
          closingHours: restaurant.closingHours,
        }));

        setRestaurants(formattedRestaurants);
        setFilteredRestaurants(formattedRestaurants);
      } catch (error) {
        console.error("Error loading restaurants:", error);
        // Fallback to empty state on error
        setRestaurants([]);
        setFilteredRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants based on search and category
  useEffect(() => {
    let filtered = restaurants;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cuisines.some((c) =>
            c.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          r.city.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category (map to cuisine types)
    if (selectedCategory !== "all") {
      const categoryMap = {
        veg: "vegetarian",
        nonveg: "non-vegetarian",
        dessert: "desserts",
        others: "other",
      };

      const selectedCuisine = categoryMap[selectedCategory];
      filtered = filtered.filter((r) =>
        r.cuisines.some((c) => c.toLowerCase().includes(selectedCuisine)),
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCategory, restaurants]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel Background */}
      <section className="relative text-(--color-primary-content) py-16 md:py-40 overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0">
          <CarouselComponent />
        </div>

        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Favorite Food,
              <br />
              Delivered Fast
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Order from thousands of restaurants and get it delivered to your
              doorstep
            </p>
            {!user && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate("/register/customer")}
                  className="bg-(--color-primary) text-(--color-primary-content) px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/order-now")}
                  className="bg-(--color-base-100) text-(--color-base-content) px-8 py-3 rounded-lg font-semibold hover:bg-(--color-base-200) transition"
                >
                  Order Now
                </button>
              </div>
            )}
          </div>

          {/* Search and Location Bar */}

          <div className="flex items-center bg-(--color-base-100) rounded-lg px-4 py-3 max-w-4xl mx-auto">
            <IoSearch className="text-(--color-base-content) text-xl mr-3" />
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-(--color-base-100) w-full outline-none text-(--color-primary)"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 md:py-8 bg-linear-to-b from-(--color-primary) to-(--color-primary-content)">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-content) mb-2">
              {selectedCategory === "all"
                ? "Featured Restaurants"
                : `${categories.find((c) => c.id === selectedCategory)?.label} Options`}
            </h2>
            <p className="text-(--color-primary-content)/70">
              {filteredRestaurants.length} restaurant
              {filteredRestaurants.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Restaurants Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-primary)"></div>
              <p className="mt-4 text-(--color-base-content)">
                Loading restaurants...
              </p>
            </div>
          ) : filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => navigate(`/restaurant-menu/${restaurant.id}`)}
                  className="flex flex-col bg-(--color-base-100) rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105"
                >
                  {/* Restaurant Image */}
                  <div className="relative h-48 overflow-hidden bg-(--color-base-200)">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-sm">
                      <IoStar size={16} />
                      {restaurant.rating}
                    </div>
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="font-bold text-(--color-content) text-lg mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-(--color-base-content) text-sm mb-3">
                      {restaurant.description}
                    </p>

                    {/* Cuisines */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {restaurant.cuisines.split(",").map((cuisine, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-(--color-base-300) text-(--color-base-content) px-2 py-1 rounded capitalize"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-auto pt-3 border-t border-(--color-base-200)">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/restaurant-menu/${restaurant.id}`);
                        }}
                        className="w-full bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                      >
                        Explore Menu
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-(--color-base-content) text-lg">
                No restaurants found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 bg-(--color-primary) text-(--color-primary-content) px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-(--color-base-100) py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-content) mb-4">
              Cravings by the Numbers
            </h2>
            <p className="text-lg text-(--color-base-content)">
              See why millions trust us for their daily food delivery needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Successful Deliveries */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-primary) mb-2">
                  2.5M+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Successful Deliveries
              </h3>
              <p className="text-(--color-base-content)">
                Orders delivered with care and precision
              </p>
            </div>

            {/* Happy Customers */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-accent) mb-2">
                  500K+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Happy Customers
              </h3>
              <p className="text-(--color-base-content)">
                Satisfied users enjoying delicious food
              </p>
            </div>

            {/* Partner Restaurants */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-primary) mb-2">
                  5K+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Partner Restaurants
              </h3>
              <p className="text-(--color-base-content)">
                Restaurants serving amazing cuisine
              </p>
            </div>

            {/* Available Partners */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-accent) mb-2">
                  1K+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Active Delivery Partners
              </h3>
              <p className="text-(--color-base-content)">
                Riders ensuring quick and safe delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Feedback & Reviews Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-content) mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-(--color-base-content)">
              Real feedback from real food lovers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review Card 1 */}
            <div className="bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={20} className="text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Amazing Service!
              </h3>
              <p className="text-(--color-base-content) mb-4">
                "The food arrived hot and fresh. The delivery was incredibly
                fast. Highly impressed with Cravings' service!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold">
                  AJ
                </div>
                <div>
                  <p className="font-semibold text-(--color-content)">
                    Arun J.
                  </p>
                  <p className="text-sm text-(--color-base-content)">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={20} className="text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Best App Ever!
              </h3>
              <p className="text-(--color-base-content) mb-4">
                "Easy to use interface, wide variety of restaurants, and quick
                delivery. I order from Cravings every week!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-(--color-accent) flex items-center justify-center text-white font-bold">
                  SP
                </div>
                <div>
                  <p className="font-semibold text-(--color-content)">
                    Sneha P.
                  </p>
                  <p className="text-sm text-(--color-base-content)">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={20} className="text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Excellent Choices
              </h3>
              <p className="text-(--color-base-content) mb-4">
                "Love the variety of restaurants available. Found my new
                favorite spot through Cravings. Definitely worth it!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-(--color-content)">
                    Raj Kumar
                  </p>
                  <p className="text-sm text-(--color-base-content)">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-(--color-primary) text-(--color-primary-content) py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Restaurant Partner
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Grow your business with Cravings. Join thousands of restaurants
            already delivering with us.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-(--color-base-100) text-(--color-primary) px-8 py-3 rounded-lg font-semibold hover:bg-(--color-base-200) transition"
          >
            Partner With Us
          </button>
        </div>
      </section>
    </div>
  );
};



export default Home;