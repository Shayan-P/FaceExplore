import React, {useState} from "react";
import {getMySampleImages} from "../api/dummy-api";
import FormContainer from "../components/FormContainer";
import SampleContainer from "../components/SampleContainer";
import { Link } from "react-router-dom"
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import RainbowTypography from "../components/RainbowTypography";

export default function SearchPage() {
    const [samplePaths, setSamplePaths] = useState([])
    const updateSamplePaths = () => {
        getMySampleImages()
            .then(responseData => {
                setSamplePaths(responseData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <Container maxWidth="md" sx={{ height: "100vh" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%", p: 5}}>

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
                <FormContainer updateSamplePaths={updateSamplePaths}/>
                <hr />
                <h1>Your sample Images</h1>
                <SampleContainer samplePaths={samplePaths} updateSamplePaths={updateSamplePaths}/>
                <hr/>
                <Link to={"/gallery"}>See the result</Link>
            </Box>
        </Container>
    )
}