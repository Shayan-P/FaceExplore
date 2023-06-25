import os

from .image_item import ImageModelWrapper
from backend.core import ImageModel
from backend.settings import USER_IMAGE_PATH, IMAGE_SERVE_PATH
from uuid import uuid4
from PIL import Image
from backend.core import similarity_cluster, get_all_gallery_clusters


class User:
    session_id_to_user = dict()

    def __init__(self):
        self.sample_image_items: list[ImageModel] = []
        self.__previous_similarity_result = None

    @staticmethod
    def get_or_create_user(session_id):
        if session_id not in User.session_id_to_user:
            User.session_id_to_user[session_id] = User()
        return User.session_id_to_user[session_id]

    def get_all_sample_image_items(self):
        """ returns all sample_image_items """
        return [ImageModelWrapper(m) for m in self.sample_image_items]  # defensive copy

    def remove_sample_image_item(self, image_path):
        """ returns all sample_image_items """
        self.__previous_similarity_result = None  # have to recalculate
        self.sample_image_items = [item for item in self.sample_image_items
                                   if ImageModelWrapper(item).get_serve_path()["imagePath"] != image_path]
        # todo. have a better identifier for images
        return self.get_all_sample_image_items()

    def add_sample_image_item(self, image: Image):
        """ returns all sample_image_items """
        self.__previous_similarity_result = None  # have to recalculate
        save_path = os.path.join(USER_IMAGE_PATH, f'{str(uuid4())}.{image.format}')
        # image.save(save_path, quality='keep') # todo decide whether or not to keep the quality. also return the error to frontend if any happened
        image.save(save_path)
        self.sample_image_items.append(ImageModel(save_path))
        return self.get_all_sample_image_items()

    def get_similar_images(self) -> list["ImageModelWrapper"]:
        # todo change this to a yield over clusters...

        annot = [(cluster, *similarity_cluster(self.sample_image_items, cluster)) for cluster in
                 get_all_gallery_clusters()]
        annot.sort(key=lambda pair: pair[1], reverse=True)
        annot = annot[:5]  # todo change this
        items = []
        for cluster, _, _ in annot:
            for face in cluster.faces:
                item = face.image_item
                if item not in items:
                    items.append(item)
            items.append(ImageModel(filepath=os.path.join(IMAGE_SERVE_PATH, "delim.jpg"), do_load_faces=False))
            # todo remove this delim. add infinite scrolling
        return [ImageModelWrapper(item) for item in items]
