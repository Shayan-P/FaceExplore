import React, {useEffect, useRef, useState} from 'react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import {similarImagesAPI, deleteSampleImage, getMySampleImages, uploadSampleImage, getStaticSrc} from "../utils/api";

import './style.css'
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';


const SampleContainer = ({samplePaths, updateSamplePaths}) => {
    useEffect(updateSamplePaths, []);
    // todo maybe improve this by not inputting samplePaths?
    if(!samplePaths){
        return <div>Loading...</div>
    } else {
        return (
            [...samplePaths].map(({imagePath, thumbPath}) => (
                <div>
                    <img src={getStaticSrc(imagePath)} width={200} alt={imagePath}/>
                    <button onClick={()=>{
                        deleteSampleImage(imagePath).then(updateSamplePaths)
                    }}>remove</button>
                </div>
            ))
        )
    }
}

const GalleryContainer = ({paths}) => {
    return (
        <LightGallery
            onInit={()=>console.log('lightGallery has been initialized')}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
        >
            {[...paths].map(({imagePath, thumbPath}) => (
                <a href={getStaticSrc(imagePath)}>
                    <img alt={getStaticSrc(imagePath)} src={getStaticSrc(thumbPath)} />
                </a>
            ))}
        </LightGallery>
    );

}

const GalleryWrapper = () => {
    const [paths, setPaths] = useState([]);
    const update = () => similarImagesAPI().then(res => setPaths(res))

    return <>
        <button onClick={update}>click to see your images</button>
        <GalleryContainer paths={paths}/>
    </>
}

const FormContainer = ({updateSamplePaths}) => {
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
            {loading ? <span>is Loading</span> : []}
            <input type="file" id="image-input" name="images" accept="image/*" multiple />
        </form>
    )
}

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
        <GalleryWrapper />
      </main>
  )
}

export default IndexPage

export const Head = () => <title>Class 2025 Ring Delivery Gallery</title>
