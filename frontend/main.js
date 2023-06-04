const domain = 'http://localhost:8765'
const apiPrefix = `${domain}/api/v1`;
const similarImagesAPI = `${apiPrefix}/similar_images/`
const uploadImageAPI = `${apiPrefix}/upload_image/`


function updateSampleImageList(sampleList) {
    // clear children
    [...sampleImagesContainer.children].forEach(child => sampleImagesContainer.removeChild(child));

    // update with new ones
    [...sampleList].forEach(servePath => {
        const imgElement = document.createElement('img');
        sampleImagesContainer.appendChild(imgElement);
        imgElement.src = `/static${servePath}`;
        imgElement.width = 200;
    });
}

async function uploadFile(f) {
	let form = new FormData();
	form.append('image', f);
	let resp = await fetch(uploadImageAPI, { method: 'POST', body:form });
    if(resp.status !== 200) {
        throw new Error("error happened");
    }
    console.log(resp);
	let data = await resp.json();
    let sampleImageList = data['result'];
    updateSampleImageList(sampleImageList);
}


// Function to handle individual image selection
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

const form = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
imageInput.addEventListener('change', handleImageSelect);
