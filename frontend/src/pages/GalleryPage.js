import GalleryContainer from "../components/GalleryContainer";
import React, {useEffect, useState} from "react";
import {similarImagesAPI} from "../api/api";

export default function GalleryPage() {
    const [paths, setPaths] = useState([])
    const update = () => {similarImagesAPI().then(res => setPaths(res));}
    useEffect(update, [])

    return <>
        <h1>Images similar to you from gallery</h1>
        <GalleryContainer paths={paths} />
    </>
}