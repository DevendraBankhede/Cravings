import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import api from "../../../../config/Apiconfig";
import toast from "react-hot-toast";

const RestaurantAddress = () => {
  const [editingRestaurantAddress, setEditingRestaurantAddress] =
    useState(false);

  const [restaurantData, setRestaurantData] = useState(
    JSON.parse(sessionStorage.getItem("cravingRestaurant")) || {},
  );

  const [restaurantAddressFormData, setRestaurantAddressFormData] = useState({
    address: restaurantData?.address || "",
    city: restaurantData?.city || "",
    state: restaurantData?.state || "",
    pinCode: restaurantData?.pinCode || "",
    country: restaurantData?.country || "",
    geoLat: restaurantData?.geoLocation?.lat || "",
    geoLon: restaurantData?.geoLocation?.lon || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRestaurantAddressChange = (e) => {
    const { name, value } = e.target;
    setRestaurantAddressFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setRestaurantAddressFormData((prevData) => ({
            ...prevData,
            geoLat: latitude,
            geoLon: longitude,
          }));
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        },
      );
    }
  };

  const handleSaveRestaurantAddress = () => {
    // Implement save logic here, e.g., API call to save the address
    setEditingRestaurantAddress(false);
  };

  const handleCancelRestaurantAddress = () => {
    setEditingRestaurantAddress(false);
    // Optionally reset the form data to the original values if needed
  };

  return (
    <>
      <div className="bg-(--color-base-100) rounded-lg p-3">
        <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
          <div className="flex items-center gap-3">
            <h3 className="w-full text-sm font-semibold text-(--color-primary)">
              Address
            </h3>
          </div>

          {!editingRestaurantAddress ? (
            <div className="flex gap-3">
              <button
                onClick={() => setEditingRestaurantAddress(true)}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
              >
                <MdEdit /> Edit
              </button>
            </div>
          ) : (
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleGetLocation}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                disabled={isLoading}
              >
                {isLoading
                  ? "Getting Current Location..."
                  : "Get Current Location"}
              </button>
              <button
                onClick={handleSaveRestaurantAddress}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancelRestaurantAddress}
                className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
          <div className="w-full">
            <label className="text-xs font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={restaurantAddressFormData?.address || ""}
              onChange={handleRestaurantAddressChange}
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurantAddress ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingRestaurantAddress}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={restaurantAddressFormData?.city || ""}
              onChange={handleRestaurantAddressChange}
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurantAddress ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingRestaurantAddress}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">State</label>
            <input
              type="text"
              name="state"
              value={restaurantAddressFormData?.state || ""}
              onChange={handleRestaurantAddressChange}
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurantAddress ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingRestaurantAddress}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={restaurantAddressFormData?.pinCode || ""}
              onChange={handleRestaurantAddressChange}
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurantAddress ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingRestaurantAddress}
            />
          </div>
          <div className="w-full">
            <label className="text-xs font-semibold">Country</label>
            <input
              type="text"
              name="country"
              value={restaurantAddressFormData?.country || ""}
              onChange={handleRestaurantAddressChange}
              className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurantAddress ? "bg-white" : "bg-(--color-base-100)"} rounded`}
              disabled={!editingRestaurantAddress}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-2">
            <div className="w-full">
              <label className="text-xs font-semibold">Latitude</label>
              <input
                type="text"
                name="geoLat"
                value={restaurantAddressFormData?.geoLat || ""}
                onChange={handleRestaurantAddressChange}
                placeholder="e.g. 28.6139"
                className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurantAddress ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                disabled
              />
            </div>

            <div className="w-full">
              <label className="text-xs font-semibold">Longitude</label>
              <input
                type="text"
                name="geoLon"
                value={restaurantAddressFormData?.geoLon || ""}
                onChange={handleRestaurantAddressChange}
                placeholder="e.g. 77.2090"
                className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurantAddress ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantAddress;