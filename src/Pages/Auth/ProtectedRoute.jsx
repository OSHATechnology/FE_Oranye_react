import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
    if (!user || user === null) {
        return <Navigate replace to="/login" />;
    }

    return children
}

export default ProtectedRoute