import React, {useState} from "react";
import {getMySampleImages} from "../api/dummy-api";
import FormContainer from "../components/FormContainer";
import SampleContainer from "../components/SampleContainer";
import { Link } from "react-router-dom"

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
        <main>
            <h1>Upload Image here</h1>
            <FormContainer updateSamplePaths={updateSamplePaths}/>
            <hr />
            <h1>Your sample Images</h1>
            <SampleContainer samplePaths={samplePaths} updateSamplePaths={updateSamplePaths}/>
            <hr/>
            <Link to={"/gallery"}>See the result</Link>
        </main>
    )
}