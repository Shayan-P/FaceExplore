import sys
from io import BytesIO

from flask import Flask, jsonify, session, request
from flask_session import Session
from uuid import uuid4
from PIL import Image
from http import HTTPStatus

sys.path.append("..")

from backend.models.user import User
from backend.settings import DEFAULT_HOST, DEFAULT_PORT, SECRET_KEY, SESSION_COOKIE_NAME


app = Flask(__name__)

app.config['SECRET_KEY'] = SECRET_KEY

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_COOKIE_NAME'] = SESSION_COOKIE_NAME
app.config['SESSION_COOKIE_SECURE'] = True  # Enable secure (HTTPS) session cookies
Session(app)


@app.before_request
def setup_session():
    # Generate a unique session ID if it doesn't exist
    if 'session_id' not in session:
        session['session_id'] = str(uuid4())
    session['user'] = User.get_or_create_user(session['session_id'])


@app.route('/add_sample_image/', methods=['POST'])
def add_sample_image():
    """saves the image that user uploads to their session"""

    user: User = session['user']

    if 'image' not in request.files:
        return jsonify({'result': 'no image file found'}), HTTPStatus.BAD_REQUEST

    image = request.files['image']
    if image.filename == '':
        return jsonify({'result': 'no image selected'}), HTTPStatus.BAD_REQUEST
    try:
        image_data = image.read()
        img = Image.open(BytesIO(image_data))
        query = user.add_sample_image_item(img)
        result = [item.get_serve_path() for item in query]
        return jsonify({'result': result}), HTTPStatus.OK
    except Exception as e:
        return jsonify({'result': 'Failed to process the image\n' + 'details:' + str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/get_all_sample_images/', methods=['GET'])
def get_all_sample_images():
    """gets all sample images that user has uploaded"""
    user: User = session['user']
    query = user.get_all_sample_image_items()
    result = [item.get_serve_path() for item in query]
    return jsonify({'result': result}), HTTPStatus.OK


@app.route('/delete_sample_image/', methods=['DELETE'])
def delete_sample_image():
    """deletes the sample image with the same serve_path in the request"""
    user: User = session['user']
    image_path = request.json['imagePath']
    query = user.remove_sample_image_item(image_path)
    result = [item.get_serve_path() for item in query]
    return jsonify({'result': result}), HTTPStatus.OK


@app.route('/similar_images/', methods=['GET'])
def similar_images_api():
    """returns the serve paths of the similar images"""

    user: User = session['user']
    result = [item.get_serve_path() for item in user.get_similar_images()]
    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(DEFAULT_HOST, DEFAULT_PORT)
