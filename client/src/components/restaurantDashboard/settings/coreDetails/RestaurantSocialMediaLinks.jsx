import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import api from "../../../../config/Apiconfig";
import toast from "react-hot-toast";

const RestaurantSocialMediaLinks = () => {
  const [editingSocialMediaLinks, setEditingSocialMediaLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [restaurantData, setRestaurantData] = useState(
    JSON.parse(sessionStorage.getItem("cravingRestaurant")) || {},
  );
  const [socialMediaLinksFormData, setSocialMediaLinksFormData] = useState({
    socialMediaLinks: restaurantData?.socialMediaLinks || [],
  });

  const handleSocialMediaChange = (index, field, value) => {
    const updatedLinks = [...socialMediaLinksFormData.socialMediaLinks];
    updatedLinks[index][field] = value;
    setSocialMediaLinksFormData({ socialMediaLinks: updatedLinks });
  };

  const removeSocialMediaLink = (index) => {
    const updatedLinks = [...socialMediaLinksFormData.socialMediaLinks];
    updatedLinks.splice(index, 1);
    setSocialMediaLinksFormData({ socialMediaLinks: updatedLinks });
  };

  const addSocialMediaLink = () => {
    setSocialMediaLinksFormData((prevData) => ({
      socialMediaLinks: [
        ...prevData.socialMediaLinks,
        { platform: "", url: "" },
      ],
    }));
  };

  const handleSaveSocialMediaLinks = async () => {
    try {
      setIsLoading(true);
      const res = await api.put("/restaurant/update-social-media-links", {
        socialMediaLinks: socialMediaLinksFormData.socialMediaLinks,
      });
      setRestaurantData(res.data.data);
      sessionStorage.setItem("cravingRestaurant", JSON.stringify(res.data.data));
      toast.success(res.data.message);
      setEditingSocialMediaLinks(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update social media links. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSocialMediaLinks = () => {
    setSocialMediaLinksFormData({
      socialMediaLinks: restaurantData?.socialMediaLinks || [],
    });
    setEditingSocialMediaLinks(false);
  };

  return (
    <>
      <div className="bg-(--color-base-100) rounded-lg p-3 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-(--color-primary)">
            Social Media Links
          </label>

          {!editingSocialMediaLinks ? (
            <button
              type="button"
              onClick={() => setEditingSocialMediaLinks(true)}
              className="text-xs bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addSocialMediaLink}
                disabled={isLoading}
                className="text-xs bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded"
              >
                + Add Link
              </button>
              <button
                type="button"
                onClick={handleSaveSocialMediaLinks}
                disabled={isLoading}
                className="text-xs bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancelSocialMediaLinks}
                disabled={isLoading}
                className="text-xs bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 h-27 overflow-y-auto">
          {socialMediaLinksFormData.socialMediaLinks.map((link, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 items-center">
              <input
                type="text"
                placeholder="Platform (e.g. Instagram)"
                value={link.platform}
                onChange={(e) =>
                  handleSocialMediaChange(index, "platform", e.target.value)
                }
                className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingSocialMediaLinks ? "bg-white" : "bg-(--color-base-100)"} rounded text-sm`}
                disabled={!editingSocialMediaLinks}
              />
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "url", e.target.value)
                  }
                  className={`w-full px-1.5 py-1 border border-(--color-secondary) ${editingSocialMediaLinks ? "bg-white" : "bg-(--color-base-100)"} rounded text-sm`}
                  disabled={!editingSocialMediaLinks}
                />

                <button
                  type="button"
                  onClick={() => removeSocialMediaLink(index)}
                  disabled={!editingSocialMediaLinks}
                  className="text-red-500 text-sm px-1 disabled:opacity-30"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          {socialMediaLinksFormData.socialMediaLinks.length === 0 && (
            <p className="text-xs text-(--color-secondary)">
              No social media links added.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantSocialMediaLinks;