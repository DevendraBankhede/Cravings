import React from "react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import api from "../../config/Apiconfig";
import toast from "react-hot-toast";

const PasswordChangeModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("New password and confirm password do not match.");
        setIsLoading(false);
        return;
      }
      const res = await api.patch("/common/change-password", formData);
      toast.success("Password changed successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during password change. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-999 bg-black/60 backdrop-blur-xs flex justify-center items-center"
        // onClick={handleCloseModal}
      >
        <div className="bg-white w-xl rounded shadow max-h-[80vh] overflow-y-auto relative">
          <header className="flex justify-between p-4 border-b border-(--color-secondary)">
            <div className="font-bold text-xl text-(--color-primary)">
              Change Password
            </div>
            <button onClick={handleCloseModal}>
              <IoIosCloseCircleOutline className="text-red-400 hover:text-red-700 text-2xl" />
            </button>
          </header>
          <main>
            <div className="p-6 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="oldPassword" className="font-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="border border-(--color-secondary) rounded px-3 py-2 disabled:bg-(--color-secondary) disabled:text-(--color-secondary-content)"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="newPassword" className="font-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="border border-(--color-secondary) rounded px-3 py-2 disabled:bg-(--color-secondary) disabled:text-(--color-secondary-content)"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmNewPassword" className="font-semibold">
                  Confirm New Password
                </label>
                <input
                  type="text"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className="border border-(--color-secondary) rounded px-3 py-2 disabled:bg-(--color-secondary) disabled:text-(--color-secondary-content)"
                  disabled={isLoading}
                />
              </div>
            </div>
          </main>
          <footer className="w-full p-4 border-t border-(--color-secondary) flex justify-end gap-3">
            <button
              onClick={handleCloseModal}
              className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
              onClick={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LuLoaderCircle className="animate-spin" /> Changing...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default PasswordChangeModal;