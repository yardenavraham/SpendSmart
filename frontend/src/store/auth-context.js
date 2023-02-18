import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
	isLoggedIn: false,
    onLogout: () => {},
    onLogin: (formValues) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect (() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        console.log('logoutHandler');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = (formValues) => {
        console.log('ctx loginHandler ' + JSON.stringify(formValues));
        localStorage.setItem('isLoggedIn', 1);
        setIsLoggedIn(true);
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
