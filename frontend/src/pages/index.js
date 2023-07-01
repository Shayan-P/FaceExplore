import React, {useState} from 'react';
import {getMySampleImages} from "../api/dummy-api";

import SampleContainer from "../components/SampleContainer";
import GalleryContainer from "../components/GalleryContainer";
import FormContainer from "../components/FormContainer";

import './style.css'


const IndexPage = () => {
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
        <h1>Images similar to you from gallery</h1>
        <GalleryContainer />
      </main>
  )
}

export default IndexPage

export const Head = () => <title>Class 2025 Ring Delivery Gallery</title>
