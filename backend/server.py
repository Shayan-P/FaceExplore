import sys

from flask import Flask, jsonify, session
from flask_session import Session
from uuid import uuid4

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
def before_request():
    # Generate a unique session ID if it doesn't exist
    if 'session_id' not in session:
        session['session_id'] = str(uuid4())
    session['user'] = User.get_or_create_user(session['session_id'])


@app.route('/similar_images', methods=['GET'])
def similar_images_api():
    """returns the filenames of the similar images"""

    user: User = session['user']
    result = [item.get_serve_path() for item in user.get_similar_images()]
    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(DEFAULT_HOST, DEFAULT_PORT)
