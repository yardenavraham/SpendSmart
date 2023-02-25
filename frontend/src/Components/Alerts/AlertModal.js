import React from 'react';
import { Alert, AlertTitle, Modal, Box } from '@mui/material';

const AlertModal = ({open, alertType, message, setOpen}) => {

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
            onClose={() => {setOpen(false)}}
        >
            <Box sx={style}>
                <Alert severity={alertType}>
                    <AlertTitle>{alertType.charAt(0).toUpperCase() + alertType.slice(1)}</AlertTitle>
                    {message}
                </Alert>
            </Box>
        </Modal>


       
    )
}
export default AlertModal;
