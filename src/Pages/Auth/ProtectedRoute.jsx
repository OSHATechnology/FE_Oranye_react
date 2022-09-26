import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
    // const user = localStorage.getItem('user');
    if (!user || user === null) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute