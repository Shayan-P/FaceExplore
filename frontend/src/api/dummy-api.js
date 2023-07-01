import img1 from '../../sample-images/1.jpg'
import img2 from '../../sample-images/2.jpg'
import img3 from '../../sample-images/3.jpg'
import img4 from '../../sample-images/4.jpg'
import img5 from '../../sample-images/5.jpg'


function wrapData(img) {
    return {"imagePath": img, "thumbPath": img}
}

export const similarImagesAPI = ()=> Promise.resolve([img1, img2, img3, img4, img5].map(wrapData))

export const getMySampleImages = ()=> Promise.resolve([img1, img2].map(wrapData))

export const uploadSampleImage = (image) => Promise.resolve([img1, img2, img3].map(wrapData))

export const deleteSampleImage = (imagePath)=> Promise.resolve([img1, img2, img3].map(wrapData))

export function getStaticSrc(relpath) {
    console.log('path is ', relpath)
    console.log('img is ', img1)
    return relpath;
}
