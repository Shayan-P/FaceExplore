import img1 from './sample-images/1.jpg';
import img2 from './sample-images/2.jpg';
import img3 from './sample-images/3.jpg';
import img4 from './sample-images/4.jpg';
import img5 from './sample-images/5.jpg';
import img6 from './sample-images/6.jpg';
import img7 from './sample-images/7.jpg';


function randomChoices(array, numChoices) {
    const choices = [];
    const arrayCopy = [...array];

    for (let i = 0; i < numChoices; i++) {
        if (arrayCopy.length === 0) {
            break;
        }
        const index = Math.floor(Math.random() * arrayCopy.length);
        const choice = arrayCopy.splice(index, 1)[0];
        choices.push(choice);
        console.log(choice)
    }
    return choices;
}

function wrapData(img) {
    return {"imagePath": img, "thumbPath": img}
}

export const similarImagesAPI = ()=> Promise.resolve(randomChoices([img1, img2, img3, img4, img5, img6, img7], 5).map(wrapData))

export const getMySampleImages = ()=> Promise.resolve([img1, img2, img3, img4, img5].map(wrapData))

export const uploadSampleImage = (image) => {
    return  new Promise((resolve) => {
        setTimeout(()=>resolve([img1, img2, img3].map(wrapData)),
            1000)
    });
}

export const deleteSampleImage = (imagePath)=> Promise.resolve([img1, img2, img3].map(wrapData))

export function getStaticSrc(relpath) {
    // console.log('path is ', relpath)
    // console.log('img is ', img1)
    return relpath;
}
