import React, {useState} from "react";
import {uploadSampleImage} from "../api/dummy-api";
import {Box, CircularProgress} from "@mui/material";
import ImageUploader from './image-uploader/ImageUploader'

export default ({updateSamplePaths}) => {
    const [currentFile, setCurrentFile] = useState(null)
    const update = async (files) => {
        for(const file of files) {
            setCurrentFile(file.name)
            await uploadSampleImage(file)
            updateSamplePaths()
        }
        setCurrentFile(null)
    };
    return (
        <>
            <ImageUploader handleUpdate={update} />
            <Box sx={{display: "flex", alignContent: "center"}}>
                {currentFile ?
                    (<div><CircularProgress /><span>processing file {currentFile}</span></div>)
                    : []
                }
            </Box>
        </>
    )
}
