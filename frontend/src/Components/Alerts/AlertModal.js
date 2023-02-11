import React from 'react';
import { Alert, AlertTitle, Modal, Box } from '@mui/material';

const AlertModal = ({open, alertType, message}) => {

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

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Alert severity="success">
                    <AlertTitle>{alertType}</AlertTitle>
                    {message}
                </Alert>
            </Box>
        </Modal>


       
    )
}
export default AlertModal;
