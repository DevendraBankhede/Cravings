import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("cravingUser")) || null,
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [role, setRole] = useState(user ? user.userType : null);

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user ? user.userType : null);
  }, [user]);

  const value = { user, isLogin, role, setUser, setIsLogin, setRole };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);