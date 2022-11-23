import { Navigate, useLocation } from "react-router-dom";

import { logout } from "../api/api";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    let location = useLocation();
    console.log(token, !!!token);
    if (!token) {
        logout();
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
}
