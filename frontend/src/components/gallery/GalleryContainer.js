import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import {getStaticSrc, similarImagesAPI} from "../../api/api";
import React, {useState} from "react";

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import 'progressive-image.js/dist/progressive-image';
import 'progressive-image.js/dist/progressive-image.css';
// for lazy loading
// github
// https://github.com/craigbuckler/progressive-image.js

import './style.css'

export default function GalleryContainer({paths}) {
    // todo set row width and ncols for different devices responsively
    return (
        <LightGallery
            onInit={()=>console.log('lightGallery has been initialized')}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            thumbContHeight={100} // Adjust this value as needed
        >
            {[...paths].map(({imagePath, thumbPath}) => (
                <a href={getStaticSrc(imagePath)}
                   className="progressive replace"
                >
                    <img src={getStaticSrc(thumbPath)} className="preview my-preview"/>
                </a>
            ))}
        </LightGallery>
    );
    {/*<LazyLoadImage alt={getStaticSrc(imagePath)}*/}
    {/*               placeholder={<CircularProgress />}*/}
    {/*               // PlaceholderSrc={getStaticSrc('/sample-images/yogesh.jpg')}*/}
    {/*               src={getStaticSrc(imagePath)}*/}
    {/*               effect={"opacity"}*/}
    {/*               width={400}/>*/}
    {/*todo remove this hardcoded 200*/}

}