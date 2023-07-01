import React, {useEffect} from "react";
import {CircularProgress} from "@mui/material";
import {deleteSampleImage, getStaticSrc} from "../api/dummy-api";

export default ({samplePaths, updateSamplePaths}) => {
    useEffect(updateSamplePaths, []);
    // todo maybe improve this by not inputting samplePaths?
    if(!samplePaths){
        return <CircularProgress />
    } else {
        return (
            [...samplePaths].map(({imagePath, thumbPath}) => (
                <div key={imagePath}>
                    <img src={getStaticSrc(imagePath)} width={200} alt={imagePath}/>
                    <button onClick={()=>{
                        deleteSampleImage(imagePath).then(updateSamplePaths)
                    }}>remove</button>
                </div>
            ))
        )
    }
}
