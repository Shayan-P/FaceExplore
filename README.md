# PersonalPhotoFinder

PersonalPhotoFinder is a tool that uses face detection to
search for photos in which a specific person is present among a large pool of images.

## Data

- create the folder `image-data` and store images in this folder.
- run the nginx service in services folder to statically serve the images
- run the backend in backend folder

## dependencies

- install docker and docker-compose for services

## other

- configure the port and domain of the application in nginx.conf (default is localhost:8765)
- currently limit of photo that users can upload is 30M. you can modify it in nginx.conf `client_max_body_size       30M;`

## todos

- add some logger
- rate limiter on requests of anyone
- we should clear out user images after a while or memory crisis happens
- prevent fast clicking in upload