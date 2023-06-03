import os

from PIL import Image
from backend.settings import IMAGE_SERVE_PATH, GALLERY_IMAGE_PATH
from tqdm import tqdm


class ImageItem:
    """represents an image in the collection"""
    def __init__(self, filepath: str):
        """filename is the name of the file in image-data"""
        self.filepath = filepath
        self.image = Image.open(filepath)

    def get_serve_path(self) -> str:
        assert self.filepath.startswith(IMAGE_SERVE_PATH)
        return self.filepath.removeprefix(IMAGE_SERVE_PATH)

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
