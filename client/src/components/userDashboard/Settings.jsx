import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, setUser } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditable(false);

    const payLoad = {
      email: tempUser.email.toLowerCase(),
      fullName: tempUser.fullName,
      phone: tempUser.phone,
    };

    console.log(payLoad);

    try {
      const res = await api.put("/user/edit-profile", payLoad);
      setUser(res.data.data);
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
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={user.photo} alt="" className="w-full h-full object-cover" />
      </div>
      {isEditable === true ? (
        <>
          <div className="grid w-sm gap-3">
            <input
              type="text"
              name="fullName"
              value={tempUser.fullName}
              className="border p-2"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={tempUser.email}
              className="border p-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled
            />
            <input
              type="number"
              name="phone"
              value={tempUser.phone}
              className="border p-2"
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <div>{user.fullName}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
          </div>
        </>
      )}

      {isEditable === true ? (
        <>
          <button onClick={() => setIsEditable(false)} className="border p-3 ">
            Cancel
          </button>
          <button onClick={handleSave} className="border p-3 ">
            Save
          </button>
        </>
      ) : (
        <button onClick={() => setIsEditable(true)} className="border p-3 ">
          Edit
        </button>
      )}
    </>
  );
};

export default Settings;