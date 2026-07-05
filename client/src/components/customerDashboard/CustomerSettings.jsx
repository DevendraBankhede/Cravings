import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";

const CustomerSetting = () => {
  const { user, setUser } = useAuth();

  // User Profile States
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "https://via.placeholder.com/150",
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Update profileData when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: user.photo || "https://via.placeholder.com/150",
      });
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user?.fullName, user?.email, user?.phone, user?.photo]);

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      setIsSavingProfile(true);

      const response = await api.put(`/user/edit-profile`, {
        fullName: formData.fullName,
        email: formData.email.toLowerCase(),
        phone: formData.phone,
      });

      const updatedUser = response.data.data;
      setProfileData({
        fullName: updatedUser.fullName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        photo: updatedUser.photo || "https://via.placeholder.com/150",
      });

      setUser(updatedUser);
      sessionStorage.setItem("cravingUser", JSON.stringify(updatedUser));

      setEditingProfile(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleCancelProfile = () => {
    setFormData({
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
    });
    setEditingProfile(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    console.log(file);
    console.log(fileURL);

    setProfilePicPreview(fileURL);
  };

  return (
    <div className="overflow-y-auto h-full p-6 space-y-6">
      {/* User Profile Section */}
      <div className="bg-(--color-base-200) rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          {!editingProfile ? (
            <button
              onClick={() => setEditingProfile(true)}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
            >
              <MdEdit /> Edit
            </button>
          ) : (
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                disabled={isSavingProfile}
              >
                {isSavingProfile ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancelProfile}
                className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                disabled={isSavingProfile}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-36 h-36">
                <img
                  src={profilePicPreview || profileData.photo}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-(--color-primary)"
                />
              </div>

              <div
                className="absolute cursor-pointer bottom-1 right-1 border p-2 rounded-full w-fit bg-(--color-base-200)"
                title="Change Photo"
              >
                <label htmlFor="profilePic" className="cursor-pointer">
                  <MdOutlineAddAPhoto className="text-xl" />
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
            </div>

            <div className="space-y-4 w-full">
              <div className="grid grid-cols-5 gap-2 justify-center items-center">
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleProfileChange}
                  className={`w-full px-3 py-2 border ${editingProfile ? "border-(--color-secondary)" : "border-transparent"} rounded col-span-4`}
                  disabled={!editingProfile}
                />

                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  className={`w-full px-3 py-2 border ${editingProfile ? "border-(--color-secondary)" : "border-transparent"} rounded col-span-4`}
                  disabled={!editingProfile}
                />

                <label className="block text-sm font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  className={`w-full px-3 py-2 border ${editingProfile ? "border-(--color-secondary)" : "border-transparent"} rounded col-span-4`}
                  disabled={!editingProfile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSetting;