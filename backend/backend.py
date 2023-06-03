from flask import Flask, request, jsonify
from types import Image
import io

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

    similar_images = similars(processed_images)
    similar_images_filenames = [img.filename for img in similar_images]
    return jsonify({'result': similar_images_filenames})


if __name__ == '__main__':
    app.run()
