import os

from backend.models.image_item import ImageItem
from backend.settings import USER_IMAGE_PATH
from uuid import uuid4
from backend.core import similar_images
from PIL import Image


class User:
    session_id_to_user = dict()

    def __init__(self):
        self.sample_image_items: list[ImageItem] = []
        self.__previous_similarity_result = None

    @staticmethod
    def get_or_create_user(session_id):
        if session_id not in User.session_id_to_user:
            User.session_id_to_user[session_id] = User()
        return User.session_id_to_user[session_id]

    def get_all_sample_image_items(self):
        """ returns all sample_image_items """
        return list(self.sample_image_items)  # defensive copy

    def remove_sample_image_item(self, serve_path):
        """ returns all sample_image_items """
        self.__previous_similarity_result = None # have to recalculate
        self.sample_image_items = [item for item in self.sample_image_items
                                   if item.get_serve_path() != serve_path]
        return list(self.sample_image_items)  # defensive copy

    def add_sample_image_item(self, image: Image):
        """ returns all sample_image_items """
        self.__previous_similarity_result = None # have to recalculate
        save_path = os.path.join(USER_IMAGE_PATH, f'{str(uuid4())}.{image.format}')
        image.save(save_path)
        self.sample_image_items.append(ImageItem(save_path))
        return list(self.sample_image_items)  # defensive copy

    def get_similar_images(self) -> list["ImageItem"]:
        # todo investigate what the problem with caching is...
        # if self.__previous_similarity_result is None:
        #     # cache the result while no change happens to this user's input
        #     sample_images = [item.get_image() for item in self.sample_image_items]
        #     self.__previous_similarity_result = similar_images(sample_images)
        # return self.__previous_similarity_result
        sample_images = [item.get_image() for item in self.sample_image_items]
        return similar_images(sample_images)
