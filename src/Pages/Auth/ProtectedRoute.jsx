import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({children}) => {
    const user = useAuth();
    console.log(user);
    if(!user) {
        alert("You are not logged in");
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute