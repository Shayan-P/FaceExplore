import GalleryContainer from "../components/gallery/GalleryContainer";
import React, {useEffect, useState} from "react";
import {similarImagesAPI} from "../api/api";
import RainbowTypography from "../components/RainbowTypography";
import {Box, CircularProgress, Container, Stack} from "@mui/material";
import Beaver from "../components/beaver/Beaver";
import TalkBubble from "../components/talk-bubble/TalkBubble";

export default function GalleryPage() {
    const [paths, setPaths] = useState([])
    const update = () => {similarImagesAPI().then(res => setPaths(res));} // todo catch errors here
    useEffect(update, [])

    return <>
        <>
            <Container maxWidth="md" sx={{ height: "100vh" }}>
                <Stack spacing={2}>
                    <RainbowTypography variant={'h2'}
                                       textAlign={'center'}
                                       sx={{ display: "block", p: 2}}
                    >
                        {paths.length ? <>Look! We found you!</> : <><CircularProgress /> Hmm... </>}
                    </RainbowTypography>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <GalleryContainer paths={paths} />
                    </Box>
                </Stack>
            </Container>
            <Beaver talkBubbleElement={<TalkBubble text={'click on images to download them 😁'} />}/>
        </>
    </>
}