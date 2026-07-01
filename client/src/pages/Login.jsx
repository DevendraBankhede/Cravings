import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deliveryboy from "../assets/deliberyboy.png";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setUser, setIsLogin, isLogin } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., send loginData to the server
    //Validate loginData

    console.log("Login data submitted:", loginData);

    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };

    try {
      const res = await api.post("/auth/login", payload);
      toast.success(res.data.message);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      // setIsLogin(true);
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(
        error.response.status + " | " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  const inputClass =
    "border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--accent)";

  return (
    <>
      <div className="min-h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2 p-10">
        <div className="hidden md:block">
          <img src={deliveryboy} alt="" className="rotate-y-180" />
        </div>
        <div className="w-2xl bg-(--background) rounded shadow p-10 flex flex-col justify-center">
          <div className="text-xl font-semibold mb-4">Welcome Back!</div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {validateError && (
              <p className="text-red-500 text-sm col-span-2">{validateError}</p>
            )}

            <button
              type="submit"
              className="col-span-2 mt-2 bg-(--primary) text-white py-2 px-4 rounded hover:bg-(--accent)"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-(--primary) hover:underline font-semibold"
              >
                Register here
              </button>
            </p>
            <p className="text-sm">
              Having Trouble?{" "}
              <button
                onClick={() => navigate("/contact")}
                className="text-(--primary) hover:underline font-semibold"
              >
                Contact Us
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;