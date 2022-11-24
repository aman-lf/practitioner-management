import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../api/api";

export default function LogOut() {
    let location = useLocation();

    logout();
    return <Navigate to="/signin" state={{ from: location }} replace />;
}
