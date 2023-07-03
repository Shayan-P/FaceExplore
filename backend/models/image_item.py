import os

from backend.settings import IMAGE_SERVE_PATH, THUMB_IMAGE_PATH, THUMBNAIL_SIZE, FACES_PATH
from backend.core import ImageModel, FaceModel
from copy import deepcopy


class ImageModelWrapper:
    """represents an image in the collection"""

    def __init__(self, image_model: ImageModel, with_thumb=True, with_face_crops=False):
        """filename is the name of the file in image-data"""
        assert image_model.filepath.startswith(IMAGE_SERVE_PATH)

        self.image_model = image_model
        self.filepath = image_model.filepath

        self.thumbnail_path = None
        if with_thumb:
            self.__check_create_thumbnail()
        if with_face_crops:
            self.__check_create_face_crops()
            # only create this when we need to upload files
            # default is false

    def __check_create_thumbnail(self):
        rest = os.path.relpath(self.filepath, IMAGE_SERVE_PATH)
        thumb_path = os.path.join(THUMB_IMAGE_PATH, rest)
        if not os.path.exists(thumb_path):
            try:
                img = deepcopy(self.image_model.get_image())
                img.thumbnail(THUMBNAIL_SIZE)
                os.makedirs(os.path.dirname(thumb_path), exist_ok=True)
                img.save(thumb_path)
            except IOError as e:
                print(f"error saving thumbnail for file {self.filepath} in {thumb_path}")
                print(e)
        self.thumbnail_path = os.path.normpath(thumb_path)

    def __check_create_face_crops(self):
        img = self.image_model.get_image()
        for face_item in self.image_model.faces:
            path = self.get_path_for_face(face_item)
            if not os.path.exists(path):
                try:
                    os.makedirs(os.path.dirname(path), exist_ok=True)
                    img.crop(face_item.get_extended_bb()).save(path)
                except IOError as e:
                    print(f"error saving the face crop in path {path}")
                    print(e)

    def get_path_for_face(self, face_item: "FaceModel"):
        rest = os.path.relpath(self.filepath, IMAGE_SERVE_PATH)
        face_id_str = "_".join([str(int(x * 100)) for x in face_item.get_bb_percentage()])
        suffix = rest.split('.')[-1]
        path = os.path.join(os.path.join(FACES_PATH, rest), face_id_str + '.' + suffix)
        path = os.path.normpath(path)
        return path

    def get_json(self):
        assert self.filepath.startswith(IMAGE_SERVE_PATH)
        res = dict()
        res["imagePath"] = os.path.relpath(self.filepath, IMAGE_SERVE_PATH)
        if self.thumbnail_path is not None:
            assert self.thumbnail_path.startswith(IMAGE_SERVE_PATH)
            res["thumbPath"] = os.path.relpath(self.thumbnail_path, IMAGE_SERVE_PATH)
        res["imageId"] = self.image_model.get_id()
        self.__check_create_face_crops()
        res["faces"] = [
            {
                "faceId": face.get_id(),
                "bb": face.get_bb_percentage(),
                "imagePath": os.path.relpath(self.get_path_for_face(face), IMAGE_SERVE_PATH)
            }
            for face in self.image_model.faces
        ]
        return res
