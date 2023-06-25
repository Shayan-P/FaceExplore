import os
from .hidden_settings import SECRET_KEY

BACKEND_PATH = os.path.normpath(os.path.dirname(__file__))
PROJECT_PATH = os.path.normpath(os.path.dirname(BACKEND_PATH))
IMAGE_SERVE_PATH = os.path.normpath(os.path.join(PROJECT_PATH, "image-serve-path"))
GALLERY_IMAGE_PATH = os.path.normpath(os.path.join(IMAGE_SERVE_PATH, "gallery-image"))
USER_IMAGE_PATH = os.path.normpath(os.path.join(IMAGE_SERVE_PATH, "user-image"))
THUMB_IMAGE_PATH = os.path.normpath(os.path.join(IMAGE_SERVE_PATH, "thumbnail"))
DEBUG_IMAGE_PATH = os.path.normpath(os.path.join(IMAGE_SERVE_PATH, "debug"))
DEBUG_THUMB_IMAGE_PATH = os.path.normpath(os.path.join(IMAGE_SERVE_PATH, "thumb_debug"))

PICKLE_PATH = os.path.normpath(os.path.join(IMAGE_SERVE_PATH, "image-cache.pkl"))
TEMP_PICKLE_PATH = os.path.normpath(os.path.join(IMAGE_SERVE_PATH, "temp-image-cache.pkl"))


def create_path_if_not_exists(path):
    if not os.path.isdir(path):
        print(f'folder created: {path}')
        os.mkdir(path)


create_path_if_not_exists(IMAGE_SERVE_PATH)
create_path_if_not_exists(GALLERY_IMAGE_PATH)
create_path_if_not_exists(USER_IMAGE_PATH)
create_path_if_not_exists(THUMB_IMAGE_PATH)

THUMBNAIL_SIZE = (300, 300)

SESSION_COOKIE_NAME = "my_session"
DEFAULT_HOST = '0.0.0.0'  # accept from all hosts
DEFAULT_PORT = 8000
