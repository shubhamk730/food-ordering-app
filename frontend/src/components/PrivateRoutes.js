import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoutes = (props) => {
  const authContext = AuthContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("admin");
  const isAuth = authContext.isLoggedin();

  return isAuth ? (
    <Outlet />
  ) : isAdminRoute ? (
    <Navigate to="/admin/login" />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
