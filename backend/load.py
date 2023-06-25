from .core import load_data, get_all_gallery_images
from .models import ImageModelWrapper


def load():
    load_data()
    for item in get_all_gallery_images():
        ImageModelWrapper(item, with_thumb=True)  # just to make sure thumbs are built before we start
