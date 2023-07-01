import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import {getStaticSrc, similarImagesAPI} from "../api/dummy-api";
import React, {useState} from "react";

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

export default () => {
    const [paths, setPaths] = useState([]);
    const update = () => similarImagesAPI().then(res => setPaths(res))

    return <>
        <button onClick={update}>click to see your images</button>
        <innerContainer paths={paths}/>
    </>
}

function innerContainer({paths}) {
    return (
        <LightGallery
            onInit={()=>console.log('lightGallery has been initialized')}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
        >
            {[...paths].map(({imagePath, thumbPath}) => (
                <a href={getStaticSrc(imagePath)}>
                    <img alt={getStaticSrc(imagePath)} src={getStaticSrc(thumbPath)} width={200}/>
                    {/*todo remove this hardcoded 200*/}
                </a>
            ))}
        </LightGallery>
    );
}
