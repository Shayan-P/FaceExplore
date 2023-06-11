import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'


const domain = 'http://localhost:8765'
const apiPrefix = `${domain}/api/v1`;

async function extract_result(response_promise) {
    const response = await response_promise
    if(response.status !== 200) {
        console.error("error happened", response)
        throw new Error("status of the response is " + response.status)
    }
    const data = await response.json()
    return data["result"]
}

const similarImagesAPI = ()=> (extract_result(
    fetch(`${apiPrefix}/similar_images/`, {
        credentials: "same-origin"
    })
))

const getMySampleImages = ()=> (extract_result(
    fetch(`${apiPrefix}/get_all_sample_images/`, {
        credentials: "same-origin"
    })
))

const uploadImageAPI = (image) => {
    const form = new FormData()
    form.append('image', image)
    return extract_result(
        fetch(`${apiPrefix}/add_sample_image/`, {
            credentials: "same-origin",
            method: 'POST',
            body: form
        })
    )
}

const deleteSampleImage = (imagePath)=> (extract_result(
    fetch(`${apiPrefix}/delete_sample_image/`, {
        credentials: "same-origin",
        method: 'DELETE',
        body: JSON.stringify({imagePath}),
        headers: {
            "Content-Type": "application/json"
        }
    })
))

function getStaticSrc(relpath) {
    return "/static" + (relpath[0] === '/' ? "" : "/") + relpath
}

async function uploadFile(f) {
    const sampleList = await uploadImageAPI(f)
    updateSampleImageList(sampleList) // you may remove this since sample image list gets updated later
}

async function asyncUpdateGallery() {
    const resultPaths = await similarImagesAPI();

    // clear children
    [...galleryContainer.children].forEach(child => galleryContainer.removeChild(child));

    // update with new ones
    const newItems = [...resultPaths].map(({imagePath, thumbPath}, index) => {
        const item = document.createElement("a")
        item.href = getStaticSrc(imagePath);
        item.dataLgSize = "1600-2400"
        const nodeImg = document.createElement("img")
        nodeImg.src = getStaticSrc(thumbPath)
        item.appendChild(nodeImg)
        return item;
    });
    galleryContainer.append(...newItems)
    // Update LightGallery's gallery items
    // lgallery.updateSlides(newItems);
    // refresh LightGallery to display the new image
    lgallery.refresh();
}

function updateGallery() {
    asyncUpdateGallery().catch(console.error)
}

function updateSampleImageList(sampleList) {
    // clear children
    [...sampleImagesContainer.children].forEach(child => sampleImagesContainer.removeChild(child));
    // todo rewrite with d3?
    // update with new ones
    [...sampleList].forEach(({imagePath, thumbPath}) => {
        const div = document.createElement('div');
        const imgElement = document.createElement('img');
        const removeButton = document.createElement('button');
        div.appendChild(imgElement);
        div.appendChild(removeButton);
        imgElement.src = getStaticSrc(imagePath);
        imgElement.width = 200;
        removeButton.textContent = 'remove';
        removeButton.addEventListener('click', () => {
            deleteSampleImage(imagePath)
                .then(newSampleList => updateSampleImageList(newSampleList))
        });
        sampleImagesContainer.appendChild(div);
    });
}

async function asyncHandleImageSelect(event) {
    const uploadRequests = [...event.target.files].map(file => uploadFile(file))
    await Promise.all(uploadRequests)
    form.reset();
    const sampleList = await getMySampleImages()
    console.log(sampleList)
    updateSampleImageList(sampleList)
}

function handleImageSelect(event) {
    asyncHandleImageSelect(event).catch(console.error)
}

const sampleImagesContainer = document.getElementById('sample-images-container');
const galleryContainer = document.getElementById('gallery-container');
const similarRequestButton = document.getElementById('similar-request-button')
// todo add some limit that you are not able to press this button twice without having changed anything
// todo or put some rate limiter on server

const form = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
imageInput.addEventListener('change', handleImageSelect);

similarRequestButton.addEventListener('click', updateGallery)


const lgallery = lightGallery(galleryContainer, {
    speed: 500,
    controls: false,
    plugins: [lgZoom, lgThumbnail],
    thumbnail: true
});

// galleryContainer.addEventListener("lgInit", (event) => {
//     const pluginInstance = event.detail.instance;
//     const $toolbar = pluginInstance.outer.find(".lg-toolbar");
//     $toolbar.prepend(customButtons);
//     document.getElementById("lg-toolbar-prev").addEventListener("click", () => {
//         pluginInstance.goToPrevSlide();
//     });
//     document.getElementById("lg-toolbar-next").addEventListener("click", () => {
//         pluginInstance.goToNextSlide();
//     });
// });

// initialize sample data:
getMySampleImages().then(updateSampleImageList).catch(console.error)
