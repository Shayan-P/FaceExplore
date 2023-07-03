import React, {useEffect} from "react";
import {Avatar, Box, Button, CircularProgress} from "@mui/material";
import {getStaticSrc, deleteSampleImage, deleteSampleFace} from "../../api/api";
import './style.css';
import DeleteIcon from '@mui/icons-material/Delete';


export default ({sampleImageItems, updateSampleImageItems}) => {
    useEffect(updateSampleImageItems, []);
    if(!sampleImageItems){
        return <CircularProgress />
    } else {
        const faceItemList = []
        for(let imageItem of sampleImageItems) {
            for(let faceItem of imageItem.faces) {
                faceItemList.push({...faceItem, imageItem})
            }
        }

        return (
            <CustomGrid ncolumns={3}>
                {[...faceItemList].map((faceItem) => (
                    <Box key={faceItem.faceId} sx={{display: "flex", justifyContent: "center"}}>
                        <CustomAvatar faceItem={faceItem} update={updateSampleImageItems}/>
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

function CustomAvatar({update, faceItem}) {
    return <>
        <div className={"avatar-container"} style={{position: "relative"}}>
            <Avatar src={getStaticSrc(faceItem.imagePath)} alt={getStaticSrc(faceItem.imagePath)}
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
                        deleteSampleFace(faceItem).then(update)
                    }}>
                </DeleteIcon>
            </Button>
        </div>
    </>
}
