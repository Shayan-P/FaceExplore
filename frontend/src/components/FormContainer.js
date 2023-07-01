import React, {useRef, useState} from "react";
import {uploadSampleImage} from "../api/dummy-api";
import {CircularProgress} from "@mui/material";

export default ({updateSamplePaths}) => {
    const [loading, setLoading] = useState(false)

    const formRef = useRef(null);

    const update = async (event) => {
        setLoading(true)
        for(const file of event.target.files) {
            await uploadSampleImage(file);
            updateSamplePaths()
        }
        formRef.current.reset();
        setLoading(false)
    };

    return (
        <form ref={formRef} encType="multipart/form-data" onChange={update}>
            {loading ? <CircularProgress /> : []}
            <input type="file" id="image-input" name="images" accept="image/*" multiple />
        </form>
    )
}
