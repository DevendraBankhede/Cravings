import React, { useState, useEffect } from "react";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import ResturantCoreDetails from "./settings/ResturantCoreDetails";
import Information from "./settings/restaurantInformation/Index";
import RestaurantPhotos from "./settings/RestaurantPhotos";
import Loader from "../../assets/runningLoader.gif";
import { IoMdHammer } from "react-icons/io";

const RestaurantSetting = () => {
  const { user } = useAuth();
  const Tabs = [
    { id: "information", label: "Information" },
    { id: "coreDetails", label: "Core Details" },
    { id: "photos", label: "Photos" },
  ];
  const [activeTab, setActiveTab] = useState("information");

  const [isLoadingResturantOpen, setIsLoadingResturantOpen] = useState(true);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(
    sessionStorage.getItem("RestaurantOpen") || false,
  );  

  //Load Restaurant Data
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [restaurantData, setRestaurantData] = useState();

  const fetchRestaurantData = async () => {
    try {
      setIsLoadingRestaurant(true);
      setIsLoadingResturantOpen(true);

      const res = await api.get(
        `/restaurant/get-resturant-data?id=${user._id}`,
      );
      setRestaurantData(res.data.data);
      sessionStorage.setItem(
        "cravingRestaurant",
        JSON.stringify(res.data.data),
      );
      sessionStorage.setItem("RestaurantOpen", res.data.data.isOpen);

      setIsRestaurantOpen(res.data.data.isOpen);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
      setLoadingRestaurantError(
        error.response?.data?.message ||
          "Unknown error occurred fetching restaurant. Please try again.",
      );
    } finally {
      setIsLoadingRestaurant(false);
      setIsLoadingResturantOpen(false);
    }
  };

  const handleRestaurantOpen = async () => {
    try {
      setIsLoadingResturantOpen(true);

      const res = await api.patch(
        `/restaurant/change-open-status/${!isRestaurantOpen}?id=${user._id}`,
      );
      setIsRestaurantOpen(res.data.data.isOpen);
      setRestaurantData(res.data.data);
      sessionStorage.setItem(
        "cravingRestaurant",
        JSON.stringify(res.data.data),
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while Opening the Restaurant. Please try again.",
      );
    } finally {
      setIsLoadingResturantOpen(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, [user]);

  console.log(isRestaurantOpen);

  return (
    <>
      <div className=" h-full flex flex-col">
        <div className="border-b border-(--color-secondary)/50 flex justify-between mb-2 w-full">
          <div className="flex gap-3 ">
            {Tabs.map((tab, idx) => (
              <div
                key={idx}
                className={`p-2 uppercase cursor-pointer ${activeTab === tab.id ? "text-(--color-primary) border-b-3 border-(--color-primary)" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="w-22 text-xs font-semibold">Currently Open</label>
            {isLoadingResturantOpen || isLoadingRestaurant ? (
              <RiLoader4Fill className="animate-spin" />
            ) : (
              <input
                type="checkbox"
                name="isOpen"
                checked={isRestaurantOpen}
                onClick={handleRestaurantOpen}
                className=" w-4 h-4 accent-(--color-primary)"
              />
            )}
          </div>
        </div>

        {isLoadingRestaurant ? (
          <img src={Loader} alt="" className="w-50 h-10" />
        ) : (
          <div className="h-full rounded-lg bg-(--color-base-200) p-2">
            {activeTab === "information" && <Information />}
            {activeTab === "coreDetails" && <ResturantCoreDetails />}
            {activeTab === "photos" && <RestaurantPhotos />}
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantSetting;