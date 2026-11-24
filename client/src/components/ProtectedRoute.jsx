import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isLogin, role, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Loader height="100vh" width="100vw" />;
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
