const domain = 'http://localhost:8765'
const apiPrefix = `${domain}/api/v1`;
const similarImagesAPI = `${apiPrefix}/similar_images/`
const staticImageAPI = `${apiPrefix}/static/`
const uploadImageAPI = `${apiPrefix}/upload_image/`


function updateSampleImageList(sampleList) {
    console.log('uploading list', sampleList);
}

async function uploadFile(f) {
	let form = new FormData();
	form.append('file', f);
    console.log('before fetch')
	let resp = await fetch(uploadImageAPI, { method: 'POST', body:form });
    if(resp.status !== 200) {
        console.log("here");
        throw new Error("error happened");
    }
    console.log(resp);
    console.log('after fetch')
	let data = await resp.json();
    let sampleImageList = data['result'];
    updateSampleImageList(sampleImageList);
}


// Function to handle individual image selection
function handleImageSelect(event) {
    console.log('length is ', event.target.files.length);
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

const form = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
imageInput.addEventListener('change', handleImageSelect);
