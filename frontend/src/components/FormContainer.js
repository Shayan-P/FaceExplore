import React, {useState} from "react";
import {uploadSampleImage} from "../api/dummy-api";
import {Box, CircularProgress} from "@mui/material";
import {FileUploader} from "react-drag-drop-files";

export default ({updateSamplePaths}) => {
    const [currentFile, setCurrentFile] = useState(null)
    // const formRef = useRef(null);
    //
    // const update = async (event) => {
    //     setLoading(true)
    //     for(const file of event.target.files) {
    //         await uploadSampleImage(file);
    //         updateSamplePaths()
    //     }
    //     formRef.current.reset();
    //     setLoading(false)
    // };

    const update = async (files) => {
        for(const file of files) {
            setCurrentFile(file.name)
            await uploadSampleImage(file)
            updateSamplePaths()
        }
        setCurrentFile(null)
    };

    // return (
    //     <form ref={formRef} encType="multipart/form-data" onChange={update}>
    //         {loading ? <CircularProgress /> : []}
    //         <input type="file" id="image-input" name="images" accept="image/*" multiple />
    //     </form>
    // )

    return (
        <>
            <FileUploader
                multiple={true}
                handleChange={update}
                name="file"
                types={['PNG', 'JPEG', 'JPG']}
                label="upload a sample image"
            />
            <Box sx={{display: "flex", alignContent: "center"}}>
                {currentFile ?
                    (<div><CircularProgress /><span>processing file {currentFile}</span></div>)
                    : []
                }
            </Box>
        </>
    )
}
