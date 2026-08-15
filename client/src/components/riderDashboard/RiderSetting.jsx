import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/Apiconfig";
import toast from "react-hot-toast";
import PasswordChangeModal from "../commonModals/PasswordChangeModal";
import Information from "./settings/riderInformation/Index";
import CoreDetails from "./settings/coreDetails/Index";
import RiderPhotos from "./settings/RiderPhotos";

const RiderSetting = () => {
  const Tabs = [
    { id: "information", label: "Information" },
    { id: "coreDetails", label: "Core Details" },
    { id: "photos", label: "Photos" },
  ];

  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("information");
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  const profilePicPreview = useMemo(() => {
    if (!profilePic) return "";
    return URL.createObjectURL(profilePic);
  }, [profilePic]);

  useEffect(() => {
    return () => {
      if (profilePicPreview) URL.revokeObjectURL(profilePicPreview);
    };
  }, [profilePicPreview]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) { setProfilePic(null); return; }
    setProfilePic(file);
  };

  const handleCancelPhoto = () => {
    setProfilePic(null);
    setEditingPhoto(false);
  };

  const handleSavePhoto = async () => {
    if (!profilePic) { toast.error("Please select a profile photo first."); return; }
    try {
      setIsSavingPhoto(true);
      const payload = new FormData();
      payload.append("displayPic", profilePic);
      const response = await api.put(`/common/edit-profile`, payload);
      setUser(response.data.data);
      sessionStorage.setItem("cravingUser", JSON.stringify(response.data.data));
      toast.success("Profile photo updated successfully!");
      setProfilePic(null);
      setEditingPhoto(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile photo");
    } finally {
      setIsSavingPhoto(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="border-b border-(--color-secondary)/50 flex justify-between mb-2 w-full">
          <div className="flex gap-3">
            {Tabs.map((tab, idx) => (
              <div
                key={idx}
                className={`p-2 uppercase cursor-pointer ${
                  activeTab === tab.id
                    ? "text-(--color-primary) border-b-3 border-(--color-primary)"
                    : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        <div className="h-full rounded-lg bg-(--color-base-200) p-2">
          {activeTab === "information" && (
            <div className="overflow-y-auto h-full p-2 space-y-2">
              <Information />
            </div>
          )}
          {activeTab === "coreDetails" && (
            <div className="overflow-y-auto h-full p-2 space-y-2">
              <CoreDetails
                user={user}
                onOpenPasswordModal={() => setIsPasswordChangeModalOpen(true)}
              />
            </div>
          )}
          {activeTab === "photos" && (
            <div className="overflow-y-auto h-full p-2 space-y-2">
              <RiderPhotos
                user={user}
                profilePicPreview={profilePicPreview}
                editingPhoto={editingPhoto}
                isSavingPhoto={isSavingPhoto}
                onStartEdit={() => setEditingPhoto(true)}
                onCancel={handleCancelPhoto}
                onSelectPhoto={handleProfilePicChange}
                onSave={handleSavePhoto}
              />
            </div>
          )}
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

export default RiderSetting;