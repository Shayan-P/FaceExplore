import React, {useEffect} from "react";
import {Avatar, Box, Button, CircularProgress} from "@mui/material";
import {getStaticSrc, deleteSampleImage} from "../../api/dummy-api";
import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';


export default ({samplePaths, updateSamplePaths}) => {
    useEffect(updateSamplePaths, []);
    // todo maybe improve this by not inputting samplePaths?
    if(!samplePaths){
        return <CircularProgress />
    } else {
        return (
            <CustomGrid ncolumns={3}>
                {[...samplePaths].map(({imagePath, thumbPath}) => (
                    <Box key={imagePath} sx={{display: "flex", justifyContent: "center"}}>
                        <CustomAvatar path={imagePath} update={updateSamplePaths}/>
                    </Box>
                ))}
            </CustomGrid>
        )
    }
}

function CustomGrid({children, ncolumns}) {
    const rows = []
    let last_row = []
    const add_last_row = (last_row) => {
        /* todo is rows.length an appropriate key? */
        rows.push(
            <Box key={rows.length} sx={{display: "flex", justifyContent: "space-around", p: 3}}>
                {last_row}
            </Box>
        );
    };
    for(let child of children) {
        if(last_row.length === ncolumns) {
            add_last_row(last_row)
            last_row = []
        }
        last_row.push(child)
    }
    add_last_row(last_row)
    return <Box sx={{width: "100%"}}>{rows}</Box>
}

function CustomAvatar({path, update}) {
    return <>
        <div className={"avatar-container"} style={{position: "relative"}}>
            <Avatar src={getStaticSrc(path)} alt={path}
                    sx={{height: "100%", width: "100%"}}
            />
            <Button
                className={"delete-icon"}
                sx={{minHeight: 0, minWidth: 0, padding: 0}}
            >
                <DeleteIcon
                    color={'error'}
                    variant={'contained'}
                    onClick={()=>{
                        deleteSampleImage(path).then(update)
                    }}>
                </DeleteIcon>
            </Button>
        </div>
    </>
}