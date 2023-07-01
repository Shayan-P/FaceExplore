import {IconButton, Snackbar, Stack} from "@mui/material";
import {Alert} from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from "react";

// let lastSetError, lastError;

// export function throwError(e) { // todo see if we can globally use this...
//     lastSetError(e)
// }

export function ErrorSnackbar(props) {
    const [error, setError] = useState(null);

    // lastSetError = setError;
    // lastError = error;

    const closeError = () => {
        setError(null)
    }
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeError}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return <>
        {props.children}
        <Snackbar open={!!error} onClose={closeError} autoHideDuration={5000}>
            <Alert severity="error" action={action}>{error}</Alert>
        </Snackbar>
    </>
}