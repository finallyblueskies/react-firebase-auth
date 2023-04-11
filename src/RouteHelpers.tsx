import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const PrivateRoute = () => {
  const { user } = useAuth();
  const auth = user !== null;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const { user } = useAuth();
  const auth = user !== null;

  return auth ? <Navigate to="/" /> : <Outlet />;
};
