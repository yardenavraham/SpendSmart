import React, { useDispatch, useContext, useEffect } from 'react';
import AuthContext from "../../store/auth-context";

const Logout = () => {
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        console.log('logout useeffect');
        authCtx.onLogout();
    }, []);

    return(
        <div>aaaa</div>
    )
  };

  export default Logout;