import io

from flask import Flask, request, jsonify
from types import ImageItem
from core import similar_images
from PIL import Image
from settings import DEFAULT_HOST, DEFAULT_PORT

app = Flask(__name__)


@app.route('/similar_images', methods=['POST'])
def similar_images_api():
    """returns the filenames of the similar images"""

    if 'images' not in request.files:
        return jsonify({'error': 'No images provided'}), 400

    images = request.files.getlist('images')
    processed_images = []

    for image in images:
        img = Image.open(io.BytesIO(image.read()))
        processed_images.append(img)

    res_image_items: list[ImageItem] = similar_images(processed_images)
    res_image_filenames = [img_item.filename for img_item in res_image_items]
    return jsonify({'result': res_image_filenames})


if __name__ == '__main__':
    app.run(DEFAULT_HOST, DEFAULT_PORT)
