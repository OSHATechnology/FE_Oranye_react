import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');
    if (!user || user === null) {
        alert("You are not logged in");
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute