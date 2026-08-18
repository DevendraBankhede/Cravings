import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/Apiconfig";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { IoArrowBack } from "react-icons/io5";
import { TbChefHat } from "react-icons/tb";
import RestaurantHero from "../components/publicRestaurantDetails/RestaurantHero";
import RestaurantInfoStrip from "../components/publicRestaurantDetails/RestaurantInfoStrip";
import RestaurantAbout from "../components/publicRestaurantDetails/RestaurantAbout";
import RestaurantGallery from "../components/publicRestaurantDetails/RestaurantGallery";
import RestaurantContact from "../components/publicRestaurantDetails/RestaurantContact";
import RestaurantSocialLinks from "../components/publicRestaurantDetails/RestaurantSocialLinks";
import RestaurantMenu from "../components/publicRestaurantDetails/RestaurantMenu";
import { useCart } from "../context/CartContext";

const RestaurantDetailsPage = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/public/restaurant-detail/${restaurantId}`);
        setDetails(res.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load restaurant details. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [restaurantId]);

  if (isLoading) return <Loader height="100vh" width="100%" />;

  if (!details || !details.restaurantId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-(--color-base-content)">
        <TbChefHat className="text-6xl text-(--color-secondary)" />
        <p className="text-lg font-semibold">Restaurant not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-(--color-primary) text-(--color-primary-content) rounded-lg text-sm"
        >
          <IoArrowBack /> Go Back
        </button>
      </div>
    );
  }

  const restaurant = details.restaurantId;

  return (
    <div className="min-h-screen bg-(--color-base-200) relative">
      <RestaurantHero restaurant={restaurant} onBack={() => navigate(-1)} />
      <RestaurantInfoStrip restaurant={restaurant} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Left sidebar */}
        <div className="space-y-4">
          <RestaurantAbout description={restaurant.description} />
          <RestaurantGallery images={restaurant.restaurantImage} />
          <RestaurantContact restaurant={restaurant} />
          <RestaurantSocialLinks
            socialMediaLinks={restaurant.socialMediaLinks}
          />
        </div>

        {/* Right: Menu */}
        <RestaurantMenu
          menuItems={details.menuItems}
          restaurantId={restaurant._id}
          restaurantName={restaurant.restaurantName}
        />
      </div>

      {cart && totalItems > 0 && (
        <div className="fixed w-full bottom-5 flex items-center justify-center">
          <div className=" border bg-(--color-primary) text-(--color-primary-content) ps-4 pe-2 py-2 rounded-full w-4xl flex justify-between items-center">
            <div>Total items : {totalItems}</div>

            <div className="flex items-center gap-2">
              <div>Total Amount : {totalPrice}</div>
              <span>|</span>
              <button
                className="bg-(--color-primary-content) text-(--color-primary) p-2 rounded-full"
                onClick={() => navigate("/cart")}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;