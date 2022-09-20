import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({token, child}) => {
    if (token === 'Bearer null') {

        alert("anda belum login");
        return <Navigate to="/" replace />
    }
    return child
}

export default ProtectedRoute