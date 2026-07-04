import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      sessionStorage.removeItem("UserData");
      setIsLogin(false);
      setUser(false);
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  return (
    <>
      <div className="bg-(--primary) text-lg text-(--primary-text) p-3 flex justify-between items-center">
        <div>Cravings</div>

        <div className="flex gap-4 items-center">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <Link to={"/contact-us"} className="hover:underline">
            Contact us
          </Link>
          {isLogin ? (
            <div className="border-s-2 flex justify-center items-center gap-4 px-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Link
                to={"/user/dashboard"}
                className="hover:underline hover:text-(--accent)"
              >
                {user.fullName}
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-600"
              >
                <AiOutlineLogout />
              </button>
            </div>
          ) : (
            <>
              <Link
                to={"/login"}
                className="hover:underline hover:text-(--accent)"
              >
                Login
              </Link>
              <Link to={"/register"} className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;