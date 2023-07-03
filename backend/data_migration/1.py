import sys
import time
import os
import shutil
import pickle

sys.path.append("../..")

from backend.load import load
from backend.core import get_all_gallery_images
from backend.settings import PICKLE_PATH
from backend import ImageModel


def migrate():
    load()

    new_pickle_path = "".join(PICKLE_PATH.split(".")[:-1]) + f"{int(time.time())}" + '.' + PICKLE_PATH.split(".")[-1]
    new_pickle_path = os.path.normpath(new_pickle_path)

    print('backing up current pickle file to ', new_pickle_path)
    shutil.copyfile(PICKLE_PATH, new_pickle_path)  # backup

    print('making adjustments')
    all_image_items = get_all_gallery_images()
    for image_item in all_image_items:
        new_image_item = ImageModel(image_item.filepath, do_load_faces=False)
        new_image_item.faces = image_item.faces
        for face_item in new_image_item.faces:
            face_item.image_item = new_image_item

    print('saving new pickle file')
    with open(PICKLE_PATH, 'wb') as f:
        pickle.dump(all_image_items, f)


if __name__ == "__main__":
    migrate()
