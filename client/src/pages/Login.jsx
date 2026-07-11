import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../config/Apiconfig";
import { useAuth } from "../context/AuthContext";
import ForgotPasswordModal from "../components/commonModals/ForgotPasswordModal";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin, setRole } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    console.log("Login submitted:", formData);

    try {
      const res = await api.post("/auth/login", {
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      toast.success(res.data.message);
      sessionStorage.setItem("cravingUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      //console.log(res.data.data.userType);
      setRole(res.data.data.userType);

      res.data.data.userType === "restaurant" &&
        navigate("/restaurant-dashboard");

      res.data.data.userType === "rider" && navigate("/rider-dashboard");

      res.data.data.userType === "admin" && navigate("/admin-dashboard");

      res.data.data.userType === "customer" && navigate("/customer-dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during registration. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[90vh] bg-[url('/foodTable.webp')] flex items-center justify-start bg-cover bg-center p-10 md:ps-30">
        <div className="bg-white rounded-lg shadow-md px-10 py-6 max-w-md w-full">
          <h1 className="text-3xl font-bold text-(--color-primary) mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-(--color-secondary) text-center mb-6">
            Login to your Cravings account
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-(--color-neutral) font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                  errors.email
                    ? "border-(--color-error) border-2"
                    : "border-(--color-base-300)"
                }`}
              />
              {errors.email && (
                <span className="text-(--color-error) text-xs mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-(--color-neutral) font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full px-3 py-2 border rounded-md text-sm text-(--color-neutral) placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                    errors.password
                      ? "border-(--color-error) border-2"
                      : "border-(--color-base-300)"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-(--color-secondary) hover:text-(--color-primary) transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-(--color-error) text-xs mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer text-(--color-secondary)">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="cursor-pointer"
                />
                <span className="text-sm">Remember me</span>
              </label>
              <button
                onClick={() => setIsForgotPasswordModalOpen(true)}
                className="text-sm text-(--color-primary) hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-(--color-primary) text-white font-semibold rounded-md hover:bg-orange-700 transition-colors duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-(--color-secondary) text-sm">
            <Link
              to="/register"
              className="text-(--color-primary) font-semibold hover:underline transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          open={isForgotPasswordModalOpen}
          onClose={() => setIsForgotPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default Login;