from tqdm import tqdm
from .core import load_data, get_all_gallery_images
from .models import ImageModelWrapper


def load():
    load_data()
    for item in tqdm(get_all_gallery_images(), 'creating ImageModelWrapper once'):
        ImageModelWrapper(item, with_thumb=True, with_face_crops=True)
        # just to make sure thumbs are built before we start
