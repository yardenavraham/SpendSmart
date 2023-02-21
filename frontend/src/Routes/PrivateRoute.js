import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from "../store/auth-context";

const PrivateRoute = () => {
    const authCtx = useContext(AuthContext);
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    console.log('authCtx.isLoggedIn11 ' + authCtx.isLoggedIn);
    //return authCtx.isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
    return localStorage.getItem('isLoggedIn') ? <Outlet /> : <Navigate to="/signin" />;
}
export default PrivateRoute;