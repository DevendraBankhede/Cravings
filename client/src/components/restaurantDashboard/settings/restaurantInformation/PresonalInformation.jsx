import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import PasswordChangeModal from "../../../commonModals/PasswordChangeModal";
import { MdEdit, MdOutlineAddAPhoto, MdOutlineLockReset } from "react-icons/md";
import api from "../../../../config/Apiconfig";
import toast from "react-hot-toast";

const PresonalInformation = () => {
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

      const response = await api.put(`/common/edit-profile`, payload);

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

  return (
    <>
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

      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          open={isPasswordChangeModalOpen}
          onClose={() => setIsPasswordChangeModalOpen(false)}
        />
      )}
    </>
  );
};

export default PresonalInformation;