import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import Contact from "./pages/ContactUs";

const App = () => {

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:userType" element={<Register />} />
        <Route path="/Customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;