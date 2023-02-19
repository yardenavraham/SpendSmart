import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode' // import dependency


const AuthContext = React.createContext({
	isLoggedIn: false,
    onLogout: () => {},
    onLogin: (token) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountDetails, setAccountDetails] = useState({});

    useEffect (() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation !== null) {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        console.log('logoutHandler');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setAccountDetails({});
    };

    const loginHandler = (token) => {
        console.log('ctx loginHandler ' + JSON.stringify(token));
        localStorage.setItem('isLoggedIn', token);
        console.log('decode ' + JSON.stringify(jwt(token)));
        const decodedToken = jwt(token);
        setIsLoggedIn(true);
        setAccountDetails({
            'accountName': decodedToken.accountName,
            'firstName': decodedToken.firstName,
            'lastName': decodedToken.lastName,
            'email': decodedToken.email
        })
    };

    return (
        <AuthContext.Provider
            value={{
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
