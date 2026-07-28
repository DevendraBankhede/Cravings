import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/Apiconfig";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Restaurant ID:", restaurantId);

  const fetchRestaurantDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/public/restaurant-detail/${restaurantId}`,
      );
      setRestaurantDetails(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during fetching restaurant details. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [restaurantId]);

  if (isLoading) {
    return <Loader height="100vh" width="100%" />;
  }

  console.log("Restaurant Details:", restaurantDetails);
  return (
    <>
      <div>RestaurantDetailsPage</div>
    </>
  );
};

export default RestaurantDetailsPage;