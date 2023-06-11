import os
import pickle

from PIL import Image
from backend.settings import IMAGE_SERVE_PATH, GALLERY_IMAGE_PATH, THUMB_IMAGE_PATH, THUMBNAIL_SIZE, PICKLE_PATH
from tqdm import tqdm
from copy import deepcopy
from backend.functions import get_image_embedding, get_faces_images


class FaceItem:
    def __init__(self, parent_item: "ImageItem", bounding_box):
        """bounding box is in the format (x1, y1, x2, y2)"""
        self.parentItem = parent_item
        self.boundingBox = bounding_box
        cropped = parent_item.get_image().crop(bounding_box)
        self.embedding = get_image_embedding(cropped)


class ImageItem:
    """represents an image in the collection"""
    def __init__(self, filepath: str, with_thumb=True):
        """filename is the name of the file in image-data"""
        assert filepath.startswith(IMAGE_SERVE_PATH)
        self.filepath = filepath
        self.thumbnail_path = None
        self.faces = [FaceItem(self, box) for box in get_faces_images(self.get_image())]
        if with_thumb:
            self.__create_thumbnail()

    def __create_thumbnail(self):
        rest = os.path.relpath(self.filepath, IMAGE_SERVE_PATH)
        thumb_path = os.path.join(THUMB_IMAGE_PATH, rest)
        if not os.path.exists(thumb_path):
            try:
                img = deepcopy(self.get_image())
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
        return Image.open(self.filepath)


def recursive_file_search(path):
    for thing in os.listdir(path):
        cur = os.path.join(path, thing)
        if os.path.isfile(cur):
            yield cur
        elif os.path.isdir(cur):
            yield from recursive_file_search(cur)


ALL_IMAGE_ITEMS = []

if os.path.exists(PICKLE_PATH):
    ALL_IMAGE_ITEMS = list(pickle.load(open(PICKLE_PATH, 'rb')))

if os.path.exists(GALLERY_IMAGE_PATH):
    all_paths_in_pickle = set(item.filepath for item in ALL_IMAGE_ITEMS)
    for filename in tqdm(list(recursive_file_search(GALLERY_IMAGE_PATH)), "loading images"):
        try:
            path = os.path.join(GALLERY_IMAGE_PATH, filename)
            if path in all_paths_in_pickle:
                continue  # already exist in ALL_IMAGE_ITEMS
            img = ImageItem(path)
            ALL_IMAGE_ITEMS.append(img)
        except Exception as e:
            print(e)
    print("loaded ", len(ALL_IMAGE_ITEMS), "images")

    with open(PICKLE_PATH, 'wb') as f:
        pickle.dump(ALL_IMAGE_ITEMS, f)
    print("pickle file saved at ", PICKLE_PATH)
else:
    print("folder", GALLERY_IMAGE_PATH, "does not exist")
