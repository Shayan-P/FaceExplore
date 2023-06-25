import os
import pickle

from tqdm import tqdm
from backend.settings import GALLERY_IMAGE_PATH, TEMP_PICKLE_PATH, PICKLE_PATH
from .models import ImageModel
from .models import load_clusters


def recursive_file_search(path):
    for thing in os.listdir(path):
        cur = os.path.join(path, thing)
        if os.path.isfile(cur):
            yield os.path.normpath(cur)
        elif os.path.isdir(cur):
            yield from recursive_file_search(cur)


ALL_IMAGE_ITEMS = []
ALL_FACES = []
ALL_CLUSTERS = []


def save_pickle(save_path):
    with open(save_path, 'wb') as f:
        pickle.dump(ALL_IMAGE_ITEMS, f)
    print("pickle file saved at ", save_path)


def load_pickle(save_path):
    global ALL_IMAGE_ITEMS
    ALL_IMAGE_ITEMS = list(pickle.load(open(save_path, 'rb')))
    print("pickle was loaded from ", save_path)


def load_all_image_items():
    global ALL_IMAGE_ITEMS

    # todo clean up this code

    if os.path.exists(PICKLE_PATH):
        load_pickle(PICKLE_PATH)
        print('pickle file loaded')
    elif os.path.exists(TEMP_PICKLE_PATH):
        load_pickle(TEMP_PICKLE_PATH)
        print('pickle file does not exists. loading temp pickle file')
    else:
        print('no pickle file exists')

    if os.path.exists(GALLERY_IMAGE_PATH):
        print(f'reading from GALLERY_IMAGE_PATH={GALLERY_IMAGE_PATH}')
        all_paths_in_pickle = set(item.filepath for item in ALL_IMAGE_ITEMS)
        images_in_gallery = list(recursive_file_search(GALLERY_IMAGE_PATH))
        count_added = 0
        for filename in tqdm(images_in_gallery, "loading images"):
            try:
                path = os.path.normpath(os.path.join(GALLERY_IMAGE_PATH, filename))
                if path in all_paths_in_pickle:
                    continue  # already exist in ALL_IMAGE_ITEMS
                count_added += 1
                if count_added % 20 == 0:
                    save_pickle(TEMP_PICKLE_PATH)
                item = ImageModel(path, do_load_faces=True)
                ALL_IMAGE_ITEMS.append(item)
            except Exception as e:
                print(e)
        for item in ALL_IMAGE_ITEMS:
            item.filepath = os.path.normpath(item.filepath)
        print("loaded ", len(ALL_IMAGE_ITEMS), "images")

        gallery_path_set = set(images_in_gallery)
        removed_paths = [item for item in ALL_IMAGE_ITEMS if (item.filepath not in gallery_path_set)]
        if len(removed_paths) > 0:
            while True:
                q = input(f"{len(removed_paths)} images was removed compared to previous pickle.\n"
                          f"remove them from pickle as well? (y/n)")
                if q not in ['y', 'n']:
                    continue
                if q == 'y':
                    ALL_IMAGE_ITEMS = [item for item in ALL_IMAGE_ITEMS if (item.filepath in gallery_path_set)]
                if q == 'n':
                    pass
                break
        save_pickle(PICKLE_PATH)
    else:
        print("folder", GALLERY_IMAGE_PATH, "does not exist")


def load_data():
    global ALL_IMAGE_ITEMS, ALL_CLUSTERS, ALL_FACES
    load_all_image_items()
    ALL_FACES.clear()
    for item in ALL_IMAGE_ITEMS:
        ALL_FACES.extend(item.faces)
    ALL_CLUSTERS = load_clusters(ALL_FACES)


def get_all_gallery_images():
    """load_data function should have previously be called"""
    return ALL_IMAGE_ITEMS


def get_all_gallery_faces():
    """load_data function should have previously be called"""
    return ALL_FACES


def get_all_gallery_clusters():
    """load_data function should have previously be called"""
    return ALL_CLUSTERS
