import os
from PIL import Image
from settings import IMAGE_DATA_PATH
from tqdm import tqdm


class ImageItem:
    """represents an image in the collection"""
    def __init__(self, filename):
        """filename is the name of the file in image-data"""
        self.filename = filename
        filepath = os.path.join(IMAGE_DATA_PATH, filename)
        self.image = Image.open(filepath)

    """todo add preprocesses of an image here"""


ALL_IMAGE_ITEMS = []

if os.path.exists(IMAGE_DATA_PATH):
    for filename in tqdm(os.listdir(IMAGE_DATA_PATH), "loading images"):
        try:
            img = ImageItem(filename)
            ALL_IMAGE_ITEMS.append(img)
        except Exception as e:
            print(e)
    print("loaded ", len(ALL_IMAGE_ITEMS), "images")
else:
    print("folder", IMAGE_DATA_PATH, "does not exist")
