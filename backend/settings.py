import os
from hidden_settings import *

BACKEND_PATH = os.path.dirname(__file__)
PROJECT_PATH = os.path.dirname(BACKEND_PATH)
IMAGE_SERVE_PATH = os.path.join(PROJECT_PATH, "image-serve-path")
GALLERY_IMAGE_PATH = os.path.join(IMAGE_SERVE_PATH, "gallery-image")
USER_IMAGE_PATH = os.path.join(IMAGE_SERVE_PATH, "user-image")
THUMB_IMAGE_PATH = os.path.join(IMAGE_SERVE_PATH, "thumbnail")
PICKLE_PATH = os.path.join(IMAGE_SERVE_PATH, "image-cache.pkl")


def create_path_if_not_exists(path):
    if not os.path.isdir(path):
        os.mkdir(path)


create_path_if_not_exists(IMAGE_SERVE_PATH)
create_path_if_not_exists(GALLERY_IMAGE_PATH)
create_path_if_not_exists(USER_IMAGE_PATH)
create_path_if_not_exists(THUMB_IMAGE_PATH)

THUMBNAIL_SIZE = (300, 300)

SESSION_COOKIE_NAME = "my_session"
DEFAULT_HOST = '0.0.0.0'  # accept from all hosts
DEFAULT_PORT = 8000
