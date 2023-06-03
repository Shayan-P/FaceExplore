import os
from PIL import Image as PIL_Image
from settings import IMAGE_DATA_PATH
from tqdm import tqdm


class Image:
    def __init__(self, filename):
        """filename is the name of the file in image-data"""
        self.filename = filename
        filepath = os.path.join(IMAGE_DATA_PATH, filename)
        self.image = PIL_Image.open(filepath)

    @staticmethod
    def open(*arg):
        self.filepath = ""
        self.image = PIL_Image.open(*arg)


ALL_IMAGES = []

if os.path.exists(IMAGE_DATA_PATH):
    for filename in tqdm(os.listdir(IMAGE_DATA_PATH), "loading images"):
        try:
            img = Image(filename)
            ALL_IMAGES.append(img)
        except e:
            print(e)
    print("loaded ", len(ALL_IMAGES), "images")
else:
    print("folder", IMAGE_DATA_PATH, "does not exist")
