import React, { useContext } from 'react'
import Typography from '@mui/material/Typography';
import AuthContext from '../../store/auth-context';
import './Home.scss';

const Home = () => {

   const authCtx = useContext(AuthContext);
   const accountName = authCtx.accountDetails.accountName;

    return (
      <div className='home'>
        <Typography variant="h4" component="h2">Welcome {accountName}</Typography>
        <Typography>It's time to start your journey for savings!</Typography>
      </div>
    )
}
export default Home;
