import React from "react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  return (
    <>
      <div>Welcome Back!! {user.fullName}</div>
      <div>Welcome Back!! {user.email}</div>
      <div>Welcome Back!! {user.phone}</div>
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={user.photo} alt="" className="w-full h-full object-cover" />
      </div>
    </>
  );
};

export default Settings;