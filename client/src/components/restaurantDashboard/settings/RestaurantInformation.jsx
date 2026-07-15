import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Apiconfig";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto, MdOutlineLockReset } from "react-icons/md";
import PasswordChangeModal from "../../commonModals/PasswordChangeModal";
import RunningLoader from "../../../assets/runningLoader.gif";

const RestaurantInformation = () => {
  const { user, setUser } = useAuth();

  // Common State variables
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  // Profile handlers

  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profileFormData, setProfileFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData({ ...profileFormData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", profileFormData.fullName);
      payload.append("email", profileFormData.email.toLowerCase());
      payload.append("phone", profileFormData.phone);

      payload.append("displayPic", profilePic);

      const response = await api.put(`/user/edit-profile`, payload);

      setUser(response.data.data);
      sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));

      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelProfile = () => {
    setProfileFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });
    setProfilePicPreview(null);
    setEditingProfile(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicPreview(URL.createObjectURL(file));
    setProfilePic(file);
  };

  // Restaurant handlers
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(false);
  const [loadingRestaurantError, setLoadingRestaurantError] = useState(null);
  const [restaurantData, setRestaurantData] = useState();
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [restaurantFormData, setRestaurantFormData] = useState({
    restaurantName: restaurantData?.restaurantName || "",
    description: restaurantData?.description || "",
    restaurantType: restaurantData?.restaurantType || "",
    cuisineTypes: restaurantData?.cuisineTypes?.join(", ") || "",
    isOpen: restaurantData?.isOpen || false,
    contactEmail: restaurantData?.contactDetails?.email || "",
    contactPhone: restaurantData?.contactDetails?.phone || "",
    openingTime: restaurantData?.servingHours?.openingTime || "",
    closingTime: restaurantData?.servingHours?.closingTime || "",
  });

  const handleRestaurantChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantFormData({
      ...restaurantFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveRestaurant = async () => {
    try {
      setIsLoading(true);

      // Prepare payload for restaurant update
      console.log("restaurantFormData", restaurantFormData);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update restaurant",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRestaurant = () => {
    setRestaurantFormData({
      restaurantName: restaurantData?.restaurantName || "",

      description: restaurantData?.description || "",
      restaurantType: restaurantData?.restaurantType || "",
      cuisineTypes: restaurantData?.cuisineTypes?.join(", ") || "",
      isOpen: restaurantData?.isOpen || false,
      contactEmail: restaurantData?.contactDetails?.email || "",
      contactPhone: restaurantData?.contactDetails?.phone || "",
      openingTime: restaurantData?.servingHours?.openingTime || "",
      closingTime: restaurantData?.servingHours?.closingTime || "",
    });
    setEditingRestaurant(false);
  };

  const fetchRestaurantData = async () => {
    try {
      setIsLoadingRestaurant(true);

      const res = await api.get(
        `/restaurant/get-resturant-data?id=${user._id}`,
      );
      setRestaurantData(res.data.data);
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
    }
  };

  useEffect(() => {
    // fetchRestaurantData();
  }, [user]);

  return (
    <>
      <div className="overflow-y-auto h-full p-2 space-y-2">
        {/* User Profile Section */}
        <div className="bg-(--color-base-100) rounded-lg p-3 flex items-center gap-3">
          <div className="relative">
            <div className="w-26 h-26">
              <img
                src={profilePicPreview || user.photo.url}
                alt="Profile"
                className="w-full h-full rounded-xl object-cover border-2 border-(--color-primary)"
              />
            </div>

            {editingProfile && (
              <div
                className="absolute cursor-pointer bottom-0.5 right-0.5 p-1.5 rounded-ee-xl w-fit bg-(--color-base-100)"
                title="Change Photo"
              >
                <label htmlFor="profilePic" className="cursor-pointer">
                  <MdOutlineAddAPhoto className="text-sm" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePic"
                  id="profilePic"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-4 border-b border-(--color-secondary) pb-2">
              <h3 className="text-sm font-semibold text-(--color-primary)">
                Profile Information
              </h3>
              {!editingProfile ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    onClick={() => setIsPasswordChangeModalOpen(true)}
                    className="flex items-center gap-2 border border-(--color-primary) text-(--color-primary) px-2 py-0.5 rounded text-xs hover:bg-(--color-primary) hover:text-(--color-primary-content)"
                  >
                    <MdOutlineLockReset /> Change Password
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancelProfile}
                    className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="w-full ">
                    <label className="text-xs font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileFormData.fullName}
                      onChange={handleProfileChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingProfile ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingProfile}
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-xs font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileFormData.email}
                      onChange={handleProfileChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) disabled:bg-(--color-base-100) cursor-not-allowed  rounded`}
                      disabled
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-xs font-semibold">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileFormData.phone}
                      onChange={handleProfileChange}
                      className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingProfile ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                      disabled={!editingProfile}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Information Section */}
        {isLoadingRestaurant ? (
          <div className="flex flex-col justify-center items-center h-64">
            <img src={RunningLoader} alt="Loading..." className="w-40 h-40" />
            <span className="text-lg text-(--color-primary) font-semibold mt-2 animate-bounce">
              Fetching Restaurant Information
            </span>
          </div>
        ) : loadingRestaurantError ? (
          <div className="flex flex-col justify-center items-center h-64">
            <span className="text-lg text-(--color-error) font-semibold mt-2">
              {loadingRestaurantError}
            </span>
          </div>
        ) : (
          <div className="bg-(--color-base-100) rounded-lg p-3">
            <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-(--color-primary)">
                  Restaurant Information
                </h3>
              </div>

              {!editingRestaurant ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingRestaurant(true)}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                  >
                    <MdEdit /> Edit
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleSaveRestaurant}
                    className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancelRestaurant}
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
                <label className="text-xs font-semibold">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={restaurantFormData?.restaurantName || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>
              <div className="w-full">
                <label className="text-xs font-semibold">Restaurant Type</label>
                <select
                  name="restaurantType"
                  value={restaurantFormData?.restaurantType || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                  disabled={!editingRestaurant}
                >
                  <option value="">Select type</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="jain">Jain</option>
                  <option value="vegan">Vegan</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold">
                  Cuisine Types{" "}
                  <span className="font-normal text-(--color-secondary)">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  name="cuisineTypes"
                  value={restaurantFormData?.cuisineTypes || ""}
                  onChange={handleRestaurantChange}
                  placeholder="e.g. Indian, Chinese, Italian"
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={restaurantFormData?.contactEmail || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full">
                <label className="text-xs font-semibold">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={restaurantFormData?.contactPhone || ""}
                  onChange={handleRestaurantChange}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                  disabled={!editingRestaurant}
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-2">
                <div className="w-full">
                  <label className="text-xs font-semibold">Opening Time</label>
                  <input
                    type="time"
                    name="openingTime"
                    value={restaurantFormData?.openingTime || ""}
                    onChange={handleRestaurantChange}
                    className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                    disabled={!editingRestaurant}
                  />
                </div>

                <div className="w-full">
                  <label className="text-xs font-semibold">Closing Time</label>
                  <input
                    type="time"
                    name="closingTime"
                    value={restaurantFormData?.closingTime || ""}
                    onChange={handleRestaurantChange}
                    className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                    disabled={!editingRestaurant}
                  />
                </div>
              </div>

              <div className="w-full col-span-1 md:col-span-3">
                <label className="text-xs font-semibold">Description</label>
                <textarea
                  name="description"
                  value={restaurantFormData?.description || ""}
                  onChange={handleRestaurantChange}
                  rows={2}
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded resize-none`}
                  disabled={!editingRestaurant}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-(--color-base-100) rounded-lg p-3">
          <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-(--color-primary)">
                Leagal Information
              </h3>
            </div>

            {!editingRestaurant ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingRestaurant(true)}
                  className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                >
                  <MdEdit /> Edit
                </button>
              </div>
            ) : (
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleSaveRestaurant}
                  className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancelRestaurant}
                  className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="w-full">
              <label className="text-xs font-semibold">Legal Name</label>
              <input
                type="tel"
                name="legalName"
                value={restaurantFormData?.contactPhone || ""}
                onChange={handleRestaurantChange}
                className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                disabled={!editingRestaurant}
              />
            </div>
            <div className="w-full">
              <label className="text-xs font-semibold">Company Type</label>
              <input
                type="tel"
                name="companyType"
                value={restaurantFormData?.contactPhone || ""}
                onChange={handleRestaurantChange}
                className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingRestaurant ? "bg-white" : "bg-(--color-base-100)"} rounded`}
                disabled={!editingRestaurant}
              />
            </div>
          </div>
        </div>
      </div>

      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          open={isPasswordChangeModalOpen}
          onClose={() => setIsPasswordChangeModalOpen(false)}
        />
      )}
    </>
  );
};

export default RestaurantInformation;