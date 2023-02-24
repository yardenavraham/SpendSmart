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
        console.log('decodedToken.partners ' + JSON.stringify(decodedToken.partners));
        
        setIsLoggedIn(true);
        setAccountDetails({
            'id': decodedToken.id,
            'accountName': decodedToken.accountName,
            'firstName': decodedToken.firstName,
            'lastName': decodedToken.lastName,
            'email': decodedToken.email,
            // 'partners': decodedToken.partners.map(user => user.firstName)
        });
        // console.log('accountDetails ' + JSON.stringify(accountDetails));
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
