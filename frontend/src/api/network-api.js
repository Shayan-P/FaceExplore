const domain = 'http://' + window.location.host; // todo get that from an ENV variable
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

export const similarImagesAPI = ()=> (extract_result(
    fetch(`${apiPrefix}/similar_images/`, {
        credentials: "same-origin"
    })
))

export const getMySampleImages = ()=> (extract_result(
    fetch(`${apiPrefix}/get_all_sample_images/`, {
        credentials: "same-origin"
    })
))

export const uploadSampleImage = (image) => {
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

export const deleteSampleImage = (imageItem)=> (extract_result(
    fetch(`${apiPrefix}/delete_sample_image/`, {
        credentials: "same-origin",
        method: 'DELETE',
        body: JSON.stringify(imageItem),
        headers: {
            "Content-Type": "application/json"
        }
    })
))

export const deleteSampleFace = (faceItem)=> (extract_result(
    fetch(`${apiPrefix}/delete_sample_face/`, {
        credentials: "same-origin",
        method: 'DELETE',
        body: JSON.stringify(faceItem),
        headers: {
            "Content-Type": "application/json"
        }
    })
))

export function getStaticSrc(relpath) {
    return "/api/v1/static" + (relpath[0] === '/' ? "" : "/") + relpath
}
