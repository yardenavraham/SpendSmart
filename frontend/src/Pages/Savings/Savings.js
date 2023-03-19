import React, { Component, useState, useContext, useEffect } from 'react'
import { Typography, Box, Avatar, Button, Card, CardContent, CardActions, Modal } from '@mui/material';
import axios from "axios";
import dayjs from "dayjs";
import AuthContext from '../../store/auth-context';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import AddEditSaving from '../../Components/AddEditSaving/AddEditSaving'
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { withStyles } from "@material-ui/core/styles";

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

const savingsTypography = {
  root: {
    color: '#318CE7'
  }
};

const ColorTypography = withStyles(savingsTypography)(Typography);

const NewTitle = ({ text, variant }) => (
  <ColorTypography
    variant={variant}
    style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontWeight: 700
    }}
  >
    {text}
  </ColorTypography>
);

const Savings = () => {

  const authCtx = useContext(AuthContext);
  const account = authCtx.accountDetails.accountName

  const [savingsList, setSavingsList] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  const [open, setOpen] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState('add');
  // const [cashFlowSavingList, setCashFlowSavingList] = useState();

  useEffect(() => {
    getSavingsItems();
  }, [account]);

  const handleClose = () => {
    setOpen(false);
    getSavingsItems();
  
  }

  const getSavingsItems = async () => {
    try {
      const savingsResponse = await axios.get(`http://localhost:27017/Saving/${account}`);
      console.log('savingsResponse', JSON.stringify(savingsResponse.data));
      const savingsList = savingsResponse.data;
      const cashFlowSavingsList = await getSavingAmountFromCashFlow();
      console.log('cashFlowSavingsList', JSON.stringify(cashFlowSavingsList));
      //update progressBar value according csahFlowSavingsList which have the same savingType as the current saving
      setSavingsList(savingsList.map(
        item => ({
          ...item,
          progressAmount: getAmount(cashFlowSavingsList, item.description)
        })
      ));
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

  const editSaving = async (id, saving) => {
    try {
      console.log('id ' + id);
      console.log('saving ' + JSON.stringify(saving));
      await axios.patch(`http://localhost:27017/Saving/${id}`,
        saving
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSaving = async (id) => {
    console.log("im in delete saving")
    try {
      console.log('id to delete ' + id);
      await axios.delete(`http://localhost:27017/Saving/${id}`);
      getSavingsItems();
    } catch (error) {
      console.log(error);
    }
  };

  const getSavingAmountFromCashFlow = async () =>{
    const response = await axios.get(`http://localhost:27017/CashFlow/${account}`);
    console.log('response.data', response.data);
    return response.data.filter(item => item.type === "Expenses" && item.category === "Saving");
  };

  const getAmount = (cashFlowSavingList, savingDescription) => {
    const tempList = cashFlowSavingList.filter(item => item.savingType === savingDescription);
    console.log('tempList', JSON.stringify(tempList));
    const sum = tempList.reduce((accumulator, currentValue) => accumulator = accumulator + currentValue.amount, 0)
    return sum;
  }

  return (
    <>
      <div style={{ display: "flex", marginBottom:"20px", justifyContent:'center' }}>
        <NewTitle variant="h4" component="h2" text='My savings'></NewTitle>
      </div>
      <div style={{ 
          display: "flex", 
          marginBottom:"20px", 
          justifyContebt:'start', 
          width:'fit-content', 
          borderRadius: '25px', 
          backgroundColor: '#F0F8FF',
          padding: '3px'
        }}>
        <IconButton onClick={() => { setOpen(true); setAddOrEdit('add') }} color="primary" aria-label="add saving">
          <AddBoxIcon fontSize='large'/>
          <div>Add New Saving</div>
        </IconButton>
      </div>
      <div style={{
          display: "flex",
          justifyContent: "start",
          flexWrap: "wrap",
          gap: "20px 30px"
        }}>
        {savingsList.map(item => (
          <Card sx={{ maxWidth: 345 }} style={{
            border: "3px solid #318CE7",
            margin: "2px",
            width: 300,
            borderRadius: "30px",
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}>
            <CardContent>
              <div>
                {/* <Avatar style={{ float: "right" }} >
                  <EditIcon/>
                </Avatar> */}
                <div style={{ textAlign: "start" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.description}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Until {dayjs(item.date).format('MM/YYYY')}
                  </Typography></div></div>

              <BorderLinearProgress variant="determinate" value={ item.progressAmount / item.goal * 100} />
              <Typography style={{ display: "inline", float: "left" }} variant="h6" > 
                {item.progressAmount}
              </Typography>
              <Typography style={{ display: "inline", float: "right" }} variant="h6" >
                Goal: {item.goal}
                {/* {dayjs(item.date).format('DD/MM/YYYY')} */}
              </Typography>
            </CardContent>
            <CardContent/>
            <CardActions sx={{ right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} disableSpacing>
              <IconButton  onClick={() => { setOpen(true); setAddOrEdit('edit'); setSelectedCard(item); }} >
                <EditIcon style={{ color: '#318CE7' }}/>
              </IconButton>
              <IconButton  onClick={() => { deleteSaving(item._id) }} >
                <DeleteIcon style={{ color: '#318CE7' }}/>
              </IconButton>
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
          <AddEditSaving addOrEdit={addOrEdit} callbackAddSaving={saving => addSaving(saving)} callbackEditSaving={(id, saving) => editSaving(id, saving)} handleClose={handleClose} selectedCard={selectedCard} />
        </Box>
      </Modal>

    </>
  )
}
export default Savings;