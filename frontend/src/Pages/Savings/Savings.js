import React, { Component, useState, useContext, useEffect } from 'react'
import { Typography, Box, Button, Card, CardContent, CardActions } from '@mui/material';
import axios from "axios";
import dayjs from "dayjs";
import AuthContext from '../../store/auth-context';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Savings = () => {

  const authCtx = useContext(AuthContext);
  const account = authCtx.accountDetails.accountName

  const [savingsList, setSavingsList] = useState([])

  const getSavingsItems = async () => {
    const response = await axios.get(`http://localhost:27017/CashFlow/${account}`);
    setSavingsList(response.data.filter(item => item.type == 'Expenses' && item.category == 'Saving'))
    console.log('getSavings', savingsList);
  };

  useEffect(() => {
    getSavingsItems();
  }, []);

  return (
    <>
      <Typography align="center" variant="h4" component="h2">My savings</Typography>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {savingsList.map(item => (
          <Card sx={{ maxWidth: 345 }} style={{
            border: "3px solid orange",
            margin: "2px",
            width: 300
          }}>
            <CardContent>
              <div>
                {/* <Avatar style={{ float: "right" }} sx={{ bgcolor: orange[500], fontSize: 40 }}>
                  <HomeIcon sx={{ fontSize: 40 }} />
                </Avatar> */}
                <div style={{ textAlign: "start" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.description}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    2 Months left
                  </Typography></div></div>

              <BorderLinearProgress variant="determinate" value={50} />
              <Typography style={{ display: "inline", float: "left" }} variant="h6" >
                15,000
              </Typography>
              <Typography style={{ display: "inline", float: "right" }} variant="h6" >
                Goal: {item.amount}
                {/* {dayjs(item.date).format('DD/MM/YYYY')} */}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Share</Button> */}
            </CardActions>
          </Card>

        ))}
      </div>

    </>
  )
}
export default Savings;