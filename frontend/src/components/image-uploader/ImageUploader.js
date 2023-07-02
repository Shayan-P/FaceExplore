import {FileUploader} from "react-drag-drop-files";
import {Box, Paper} from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import './style.css';
import Typography from "@mui/material/Typography";
import theme from '../../theme/theme';

export default function FormUploader({handleUpdate}) {
    return (
        <FileUploader
            multiple={true}
            handleChange={handleUpdate}
            name="file"
            types={['PNG', 'JPEG', 'JPG']}
            children={<InnerElement />}
        />
    )
}

function InnerElement() {
    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <div className={'capsule-bar'} style={{background: theme.palette.primary.main}}>
                <UploadFileIcon color={'primary.light'} sx={{mr: 3}}/>
                <Typography variant={'span'} color={'primary.light'}>
                    upload a sample image of your face
                </Typography>
            </div>
        </Box>
    )
}