import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'


const domain = 'http://localhost:8765'
const apiPrefix = `${domain}/api/v1`;
const similarImagesAPI = `${apiPrefix}/similar_images/`
const uploadImageAPI = `${apiPrefix}/upload_image/`

function getStaticSrc(relpath) {
    return "/static" + (relpath[0] === '/' ? "" : "/") + relpath
}

async function uploadFile(f) {
    let form = new FormData();
    form.append('image', f);
    let resp = await fetch(uploadImageAPI, { method: 'POST', body:form });
    if(resp.status !== 200) {
        throw new Error("error happened");
    }
    let data = await resp.json();
    let sampleImageList = data['result'];
    updateSampleImageList(sampleImageList);
}

function updateSampleImageList(sampleList) {
    // clear children
    [...sampleImagesContainer.children].forEach(child => sampleImagesContainer.removeChild(child));

    // update with new ones
    [...sampleList].forEach(({imagePath, thumbPath}) => {
        const imgElement = document.createElement('img');
        sampleImagesContainer.appendChild(imgElement);
        imgElement.src = getStaticSrc(imagePath);
        imgElement.width = 200;
    });
}

async function updateGallery() {
    let resp = await fetch(similarImagesAPI);
    if(resp.status !== 200) {
        throw new Error("error happened"); // add a better handler here...
    }
    let data = await resp.json();
    let resultPaths = data['result'];

    // clear children
    [...galleryContainer.children].forEach(child => galleryContainer.removeChild(child));

    // update with new ones
    const newItems = [...resultPaths].map(({imagePath, thumbPath}, index) => {
        // const item = document.createElement("a")
        // item.href = getStaticSrc(imagePath);
        // item.dataLgSize = "1600-2400"
        // const nodeImg = document.createElement("img")
        // nodeImg.src = getStaticSrc(thumbPath)
        // item.appendChild(nodeImg)
        // return item;
        const item = document.createElement("a")
        item.href = getStaticSrc(imagePath)
    });
    galleryContainer.append(...newItems)
    // Update LightGallery's gallery items
    // lgallery.updateSlides(newItems);
    // refresh LightGallery to display the new image
    lgallery.refresh();
}

function handleImageSelect(event) {
    [...event.target.files].forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            const imgElement = document.createElement('img');
            const sendBtn = document.createElement('button');
            const cancelBtn = document.createElement('button');
            const info = document.createElement('span');

            div.appendChild(imgElement);
            div.appendChild(sendBtn);
            div.appendChild(cancelBtn);
            div.appendChild(info);
            imgElement.src = e.target.result;
            imgElement.width = 200;
            sendBtn.textContent = 'submit';
            sendBtn.addEventListener('click', () => (
                uploadFile(file)
                    .then(() => previewContainer.removeChild(div))
                    .catch(e => info.textContent = e.toString())
            ));
            cancelBtn.textContent = 'cancel';
            cancelBtn.addEventListener('click', () => previewContainer.removeChild(div));
            previewContainer.appendChild(div);
        };
        reader.readAsDataURL(file);
    });

    form.reset();
}

const previewContainer = document.getElementById('preview-container');
const sampleImagesContainer = document.getElementById('sample-images-container');
const galleryContainer = document.getElementById('gallery-container');
const similarRequestButton = document.getElementById('similar-request-button')

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
