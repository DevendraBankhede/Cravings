import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./pages/dashboard/userDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Dashboard Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;