import React from "react";
import { Navigate } from "react-router-dom";
import { AuthRedirect } from "./AuthProvider";

const GuestRoute = ({ user, children }) => {
    if (user) {
        return <Navigate replace to={AuthRedirect(user)} />;
    }

    return children
}

export default GuestRoute