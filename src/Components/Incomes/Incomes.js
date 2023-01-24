import React, { useState } from 'react';
import Income from './Income';
import { Button, Modal, Box } from '@mui/material';
import './Incomes.scss';
import AddEditModal from './AddEditModal';

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

const Incomes = props => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <h1 className="incomes-header">Incomes</h1>
            <div className="incomes-total">Total: {props.total}</div>
            <div className='incomes'>
                {props.items.map((income) => (
                    <Income
                        key={income.id}
                        id={income.id}
                        type={income.type}
                        date={income.date}
                        amount={income.amount}
                        onRemove={props.onRemove}
                    />
                ))}
            </div>
            <Button onClick={handleOpen}>Add income</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddEditModal callbackAddIncome = {income => props.onAdd(income)}/>
                </Box>
            </Modal>
        </>
    );
}
export default Incomes;