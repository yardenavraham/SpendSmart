import React, { useContext } from 'react'
import Typography from '@mui/material/Typography';
import AuthContext from '../../store/auth-context';
import PixIcon from '@mui/icons-material/Pix';
import './Home.scss';

const Home = () => {

   const authCtx = useContext(AuthContext);
   const accountName = authCtx.accountDetails.accountName;

    return (
      <div className='home'>
        <div ><Typography variant="h4" color='primary.dark'>Welcome {accountName}</Typography></div>
        <div className='home-main-header'>
            <Typography variant="h2" color='primary.dark'><PixIcon sx={{ mr: 1, verticalAlign:'middle', fontSize:'50px' }} />SpendSmart</Typography>
        </div>
        <div className='home-secondary-header'><Typography variant="h3" color='primary.dark'>It's time to start your journey for savings!</Typography></div>
      </div>
    )
}
export default Home;
