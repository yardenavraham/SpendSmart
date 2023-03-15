import React, { Component, useState, useContext, useEffect } from 'react'
import { Typography, Box, Button, Card, CardContent, CardActions, Modal } from '@mui/material';
import axios from "axios";
import dayjs from "dayjs";
import AuthContext from '../../store/auth-context';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import AddEditSaving from '../../Components/AddEditSaving/AddEditSaving'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

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

  const [savingsList, setSavingsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState('add');


  const handleClose = () => {
    setOpen(false);
    getSavingsItems();
  }

  const getSavingsItems = async () => {
    try {
      console.log("getSavingItem");
      const response = await axios.get(`http://localhost:27017/Saving/${account}`);
      setSavingsList(response.data.filter(item => item.type == 'Expenses' && item.category == 'Saving'))
      console.log('getSavings', savingsList);
    }
    catch (error) {
      console.log(error);
    }
  };

  const addSaving = async (newSaving) => {
    try {
      console.log('newSaving ' + JSON.stringify(newSaving));
      await axios.post(`http://localhost:27017/Saving/${account}`,
        newSaving
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavingsItems();
  }, [account]);

  return (
    <>
      <Typography align="center" variant="h4" component="h2">My savings</Typography>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <Button variant="outlined" onClick={() => { setOpen(true); setAddOrEdit('add') }}>Add saving</Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddEditSaving addOrEdit={addOrEdit} callbackAddSaving={saving => addSaving(saving)} handleClose={handleClose} />
        </Box>
      </Modal>

    </>
  )
}
export default Savings;