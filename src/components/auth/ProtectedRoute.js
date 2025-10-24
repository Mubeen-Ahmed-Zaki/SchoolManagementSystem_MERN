// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth); 

  if (!userInfo) {
    // agar user login nahi hai
    return <Navigate to="/login" replace />; // login page par redirect
  }

  return children; // if login then render to normal route
};

export default ProtectedRoute;
