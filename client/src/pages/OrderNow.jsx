import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/Apiconfig";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";
import defaultRestaurantImage from "../assets/Samplerestaurant.jpg";

const OrderNow = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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

  const handleRestaurant = (restaurant) => {
    navigate(`/restaurant-details/${restaurant._id}`);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (isLoading) {
    return <Loader height="100vh" width="100%" />;
  }

  return (
    <>
      <header>
        <div className="py-6">
          <h1 className="text-3xl font-bold text-(--color-primary) mb-2 text-center">
            Order From your Favorite Restaurants{" "}
          </h1>
        </div>
      </header>
      <div className="p-4 w-7xl mx-auto">
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="border border-(--color-base-300) rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => {
                  handleRestaurant(restaurant);
                }}
              >
                <div className="w-full h-48">
                  <img
                    src={restaurant?.coverImage?.url || defaultRestaurantImage}
                    alt={restaurant.restaurantName}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold">
                    {restaurant.restaurantName}
                  </h2>
                  <p>{restaurant.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound
            height="100vh"
            width="100%"
            text="No Restaurants Found"
          />
        )}
      </div>
    </>
  );
};

export default OrderNow;