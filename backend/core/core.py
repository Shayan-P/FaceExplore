from backend.models.image_item import Image, ImageItem, ALL_IMAGE_ITEMS


def similar_images(images: [Image]) -> [ImageItem]:
    return list(ALL_IMAGE_ITEMS)
