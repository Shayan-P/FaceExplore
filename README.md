# FaceExplore

FaceExplore is a face search engine that detects faces in a (potentially) huge gallery of images.

The UI allows users to retrieve all images of a person in the gallery by uploading some samples of the desired face.

FaceExplore does not require any additional data other than the gallery images (Unsupervised Learning).

Initially, the project was meant to be search engine on "MIT Ring Delivery for class of 2025" album gallery (3000 pictures of 500 people). However, it is totally as a general purpose face search tool.

## UI

### step1: Go to the website
![Screenshot from 2023-07-09 14-50-02.png](media%2FScreenshot%20from%202023-07-09%2014-50-02.png)
### step2: Upload sample image and click submit
![Screenshot from 2023-07-09 14-58-12.png](..%2F..%2FPictures%2FScreenshots%2FScreenshot%20from%202023-07-09%2014-58-12.png)
### step3: Look! We found you!
![Screenshot from 2023-07-09 15-01-22.png](media%2FScreenshot%20from%202023-07-09%2015-01-22.png)
### step4: Download the images if you'd like
![Screenshot from 2023-07-09 15-02-58.png](..%2F..%2FPictures%2FScreenshots%2FScreenshot%20from%202023-07-09%2015-02-58.png)

## Technical Details (Core)

This is what is happening under the hood:

- for each image capture the bounding box of the faces with MTCNN
- for each face compute a vector embedding for each face with Resnet
- cluster the faces based on proximity of vector embedding (we don't know the number of clusters, so we use Agglomerative clustering)
- for each new face in the sample image, compare the embedding to the embeddings of faces in each cluster and return the closest one.

Although it might sound simple there are a lot of challenges here (that is hopefully solved here):

- data does not have label. how to measure the performance? how to tune the clustering parameters?
- how to make sure the pictures of a specific person is not split into multiple clusters? or the other way around, maybe the clusters of faces of two people are merged?
- how to find out if some person is not depicted in the gallery images at all? (instead of just returning the most similar cluster)? Usually this is done by setting a hard threshold on cosine similarity, but we want to avoid hard-coding the threshold.

## Technical Details (Website)

#### Backend:
simple server with flask. passes api calls to core (`backend/core`)

#### Frontend:
implemented by React. Since it is modular, you can easily modify it for your specific usecase if you need.

used:
- [MUI](https://mui.com/) for the design of elements
- [light-gallery](https://www.lightgalleryjs.com/) for the gallery component
- [progressive-image](https://github.com/craigbuckler/progressive-image.js) as the image lazy load component

#### Services:
contains the docker-compose file and nginx config file. We serve static files using Nginx to improve performance (and also not to overload the flask server with static file serve requests).

additionally, Nginx passes api requests to backend (which is on port 8000 by default).

## dependencies

- install `docker` and `docker-compose` for services
- run `pip install -r requirements.txt` in backend folder
- run `npm install` in frontend folder

## Deploying the website

- create a folder `image-serve-path` and store the gallery images in `image-serve-path/gallery-image`
images in this folder (the structure does not matter as we recursively iterate on all images in all sub-folders of the gallery folder).
  - Additionally, you can configure the paths by in `backend/settings.py`.
  - Note that if you are using a path other than `image-serve-path` you should also set the new directory in `docker-compose.yml` so that nginx can serve the images.
- configure nginx. set the host and port (by default it is served on localhost:8765)
  - Maximum size of the file that nginx can receive and send is set to 30M. Change it if you need.
- set the `SECRET_KEY` (arbitrarily) in `backend/hidden_settings.py`.


## Starting the app in the dev mode:

- `cd services; sudo docker-compose up`
- `cd frontend; npm start`
- `cd backend; python server.py`
