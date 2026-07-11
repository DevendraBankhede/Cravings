import React from "react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import api from "../../config/Apiconfig";
import toast from "react-hot-toast";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleCloseModal = () => {
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      !isOtpSent &&
        {
          // Send OTP
        }(isOtpSent && !isOtpVerified) &&
        {
          // Verify OTP
        }(isOtpSent && isOtpVerified) &&
        {
          // Reset Password
        };
    } catch (error) {}
  };

  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-999">
        <div className="bg-white w-xl rounded shadow max-h-[80vh] overflow-y-auto relative">
          <header className="flex justify-between p-4 border-b border-(--color-secondary)">
            <div className="font-bold text-xl text-(--color-primary)">
              Forgot Password
            </div>
            <button onClick={handleCloseModal}>
              <IoIosCloseCircleOutline className="text-red-400 hover:text-red-700 text-2xl" />
            </button>
          </header>
          <main>
            <div className="p-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold">
                  Your Registred Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
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
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LuLoaderCircle className="animate-spin" /> Loading...
                </>
              ) : isOtpSent ? (
                isOtpVerified ? (
                  "Reset Password"
                ) : (
                  "Verify OTP"
                )
              ) : (
                "Send OTP"
              )}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;