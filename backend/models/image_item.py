import os

from backend.settings import IMAGE_SERVE_PATH, THUMB_IMAGE_PATH, THUMBNAIL_SIZE
from backend.core import ImageModel
from copy import deepcopy


class ImageModelWrapper:
    """represents an image in the collection"""

    def __init__(self, image_model: ImageModel, with_thumb=True):
        """filename is the name of the file in image-data"""
        assert image_model.filepath.startswith(IMAGE_SERVE_PATH)

        self.image_model = image_model
        self.filepath = image_model.filepath
        self.thumbnail_path = None

        if with_thumb:
            self.__create_thumbnail()

    def __create_thumbnail(self):
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
        self.thumbnail_path = thumb_path

    def get_serve_path(self) -> {str: str}:
        assert self.filepath.startswith(IMAGE_SERVE_PATH)
        res = dict()
        res["imagePath"] = os.path.relpath(self.filepath, IMAGE_SERVE_PATH)
        if self.thumbnail_path is not None:
            assert self.thumbnail_path.startswith(IMAGE_SERVE_PATH)
            res["thumbPath"] = os.path.relpath(self.thumbnail_path, IMAGE_SERVE_PATH)
        return res
