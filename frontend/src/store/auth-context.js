import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode' // import dependency


const AuthContext = React.createContext({
    accountDetails: {},
	isLoggedIn: false,
    onLogout: () => {},
    onLogin: (token) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountDetails, setAccountDetails] = useState({});

    const setDetails = token => {
        setIsLoggedIn(true);
        const decodedToken = jwt(token);
        console.log('decodedToken ' + JSON.stringify(decodedToken));
        setAccountDetails({
            'id': decodedToken.id,
            'password': decodedToken.password,
            'accountName': decodedToken.accountName,
            // 'firstName': decodedToken.firstName,
            // 'lastName': decodedToken.lastName,
            // 'email': decodedToken.email,
            'users': decodedToken.users,
            'image': decodedToken.image
            // 'partners': decodedToken.partners.map(user => user.firstName)
        });
    }

    useEffect (() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation !== null) {
            setDetails(storedUserLoggedInInformation);
        }
    }, []);

    const logoutHandler = () => {
        console.log('logoutHandler');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setAccountDetails({});
    };

    const loginHandler = (token) => {
        localStorage.setItem('isLoggedIn', token);
        setDetails(token);       
    };

    return (
        <AuthContext.Provider
            value={{
                accountDetails: accountDetails,
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
            >
                {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
