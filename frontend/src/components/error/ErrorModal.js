import {Box, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function ErrorModal({hasError, lastError, clearErrorObj}) {
    return (
        <Modal
            open={hasError}
            onClose={clearErrorObj}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {lastError || "Some error occurred!"}
                </Typography>
            </Box>
        </Modal>
    )
}