import React, {useState} from "react";
import {getMySampleImages} from "../api/api";
import FormContainer from "../components/FormContainer";
import FaceSampleContainer from "../components/face-sample-container/FaceSampleContainer";
import { Link } from "react-router-dom"
import {Box, Button, Container, Stack} from "@mui/material";
import RainbowTypography from "../components/RainbowTypography";
import Beaver from "../components/beaver/Beaver";
import TalkBubble from "../components/talk-bubble/TalkBubble";

export default function SearchPage() {
    const [facesReady, setFacesReady] = useState(false)

    let myBeaverText = '';
    if(facesReady) {
        myBeaverText = <span>you did it!<br /> Go on and click
                        <Button><Link to={"/gallery"}>submit</Link></Button>
                        to see the result</span>
    }

    return (
        <>
            <Container maxWidth="md" sx={{ height: "100vh" }}>
                <Stack spacing={2}>
                    <Header facesReady={facesReady} />
                    <UploadBox setFacesReady={setFacesReady} />
                </Stack>
            </Container>
            <Beaver talkBubbleElement={<TalkBubble text={myBeaverText} />}/>
        </>
    )
}


function Header({facesReady}) {
    return <>
        <RainbowTypography
            variant="h2"
            sx={{ display: "block", p: 2}}
            textAlign="center"
            font={"Shantell Sans"}
        >
            Looking for yourself?
        </RainbowTypography>

        <RainbowTypography
            variant="h6"
            sx={{ display: "block", p: 2}}
            textAlign="center"
            font={"Shantell Sans"}
        >
            search for your photos by uploading a sample photo
        </RainbowTypography>

        {facesReady?
            <RainbowTypography
                variant="span"
                sx={{ display: "block"}}
                textAlign="center"
                font={"Shantell Sans"}
            >
                to get an accurate result, remove <br/>
                the faces that do not represent your <br/>
                face by clicking on them
            </RainbowTypography>
        : []}
    </>
}

function UploadBox({setFacesReady}) {
    const [sampleImageItems, setSampleImageItems] = useState([])

    const updateSampleImageItems = () => {
        getMySampleImages()
            .then(responseData => {
                setSampleImageItems(responseData);
                setFacesReady(responseData.length > 0) // todo what to do with errors?
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return <>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", p: 5}}>
            <FormContainer updateSamplePaths={updateSampleImageItems}/>
            <FaceSampleContainer sampleImageItems={sampleImageItems} updateSampleImageItems={updateSampleImageItems}/>
        </Box>
    </>
}
