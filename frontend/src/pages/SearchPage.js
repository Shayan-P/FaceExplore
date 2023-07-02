import React, {useState} from "react";
import {getMySampleImages} from "../api/api";
import FormContainer from "../components/FormContainer";
import FaceSampleContainer from "../components/face-sample-container/FaceSampleContainer";
import { Link } from "react-router-dom"
import {Box, Button, Container, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import RainbowTypography from "../components/RainbowTypography";
import Beaver from "../components/beaver/Beaver";
import TalkBubble from "../components/talk-bubble/TalkBubble";

export default function SearchPage() {
    const [samplePaths, setSamplePaths] = useState([])
    const [beaverText, setBeaverText] = useState('')

    const updateSamplePaths = () => {
        getMySampleImages()
            .then(responseData => {
                setSamplePaths(responseData);
                if(responseData.length > 0) { // todo change this to something from backend
                    setBeaverText(<span>you did it!<br /> Go on and click
                        <Button><Link to={"/gallery"}>submit</Link></Button>
                        to see the result</span>
                    )
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <>
            <Container maxWidth="md" sx={{ height: "100vh" }}>
                <Stack spacing={2}>
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
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", p: 5}}>
                        <FormContainer updateSamplePaths={updateSamplePaths}/>
                        <FaceSampleContainer samplePaths={samplePaths} updateSamplePaths={updateSamplePaths}/>
                    </Box>
                </Stack>
            </Container>
            <Beaver talkBubbleElement={<TalkBubble text={beaverText} />}/>
        </>
    )
}