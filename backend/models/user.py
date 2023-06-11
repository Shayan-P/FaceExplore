import os
import numpy as np
import matplotlib.pyplot as plt # todo remove later

from backend.models.image_item import ImageItem, ALL_IMAGE_ITEMS
from backend.settings import USER_IMAGE_PATH
from uuid import uuid4
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

    def remove_sample_image_item(self, image_path):
        """ returns all sample_image_items """
        self.__previous_similarity_result = None # have to recalculate
        self.sample_image_items = [item for item in self.sample_image_items
                                   if item.get_serve_path()["imagePath"] != image_path]
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

        user_face_embeddings = []
        for item in self.sample_image_items:
            user_face_embeddings.extend([list(face.embedding) for face in item.faces])
        user_face_embeddings = np.array(user_face_embeddings)
        # N * D
        user_face_embeddings = user_face_embeddings / np.linalg.norm(user_face_embeddings, axis=1)[:, None]
        # normalized

        def sim_score(item: ImageItem):
            if len(item.faces) == 0:
                return 0  # todo detect the ones without face an do something about them
            item_face_embedding = np.array([
                list(face.embedding) for face in item.faces
            ]) # M * D
            item_face_embedding = item_face_embedding / np.linalg.norm(item_face_embedding, axis=1)[:, None]
            # normalized

            matrix = user_face_embeddings @ item_face_embedding.T
            # N * M
            return np.max(matrix)  # todo can be improved later...

        annot = [(item, sim_score(item)) for item in ALL_IMAGE_ITEMS]
        annot.sort(key=lambda pair: pair[1], reverse=True)

        print([pair[1] for pair in annot]) # todo remove later

        return [pair[0] for pair in annot[:100]]  # todo change 100 later
