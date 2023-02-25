import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import {useNavigate} from "react-router-dom";

const Account = () => {
  
  return (
      <>
        <Typography align="center">Placeholder for account info (profile) page</Typography>
        <Link href="/editaccount" variant="body2">
          To edit an existing account
        </Link>

      </>
    )
}
export default Account;
