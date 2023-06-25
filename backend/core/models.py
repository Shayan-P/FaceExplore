from PIL import Image


class FaceModel:
    def __init__(self, image_item, embedding, bb):
        self.image_item = image_item
        self.embedding = embedding
        self.bb = bb

    def get_cropped_image(self):
        # todo be careful. the size might be high
        return self.image_item.get_image().crop(self.bb)


class ImageModel:
    """represents an image in the collection"""

    def __init__(self, filepath: str):
        self.filepath = filepath
        self.faces = []

    def get_image(self) -> Image:
        image = Image.open(self.filepath)
        # todo be careful. the size might be high
        return image


class ClusterModel:
    def __init__(self, faces):
        self.faces = faces
