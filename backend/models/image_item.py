import os

from PIL import Image
from backend.settings import IMAGE_SERVE_PATH, GALLERY_IMAGE_PATH, THUMB_IMAGE_PATH, THUMBNAIL_SIZE
from tqdm import tqdm
from copy import deepcopy


class ImageItem:
    """represents an image in the collection"""
    def __init__(self, filepath: str, with_thumb=True):
        """filename is the name of the file in image-data"""
        assert filepath.startswith(IMAGE_SERVE_PATH)
        self.filepath = filepath
        self.thumbnail_path = None
        self.image = Image.open(filepath)
        if with_thumb:
            self.__create_thumbnail()

    def __create_thumbnail(self):
        rest = os.path.relpath(self.filepath, IMAGE_SERVE_PATH)
        thumb_path = os.path.join(THUMB_IMAGE_PATH, rest)
        if not os.path.exists(thumb_path):
            try:
                img = deepcopy(self.image)
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

    def get_image(self) -> Image:
        return self.image


ALL_IMAGE_ITEMS = []

if os.path.exists(GALLERY_IMAGE_PATH):
    for filename in tqdm(os.listdir(GALLERY_IMAGE_PATH), "loading images"):
        try:
            path = os.path.join(GALLERY_IMAGE_PATH, filename)
            img = ImageItem(path)
            ALL_IMAGE_ITEMS.append(img)
        except Exception as e:
            print(e)
    print("loaded ", len(ALL_IMAGE_ITEMS), "images")
else:
    print("folder", GALLERY_IMAGE_PATH, "does not exist")
