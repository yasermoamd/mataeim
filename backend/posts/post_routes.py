from flask import Blueprint, request, jsonify
from util.extensions import db
from posts.post_model import Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.__dict__ for post in posts])

@post_routes.route('/create', methods=['POST'])
def create_post():
    if request.method == 'POST':
        data = request.get_json()

        post = Post(
            title=data.get('title'),
            content=data.get('content'),
            user_id=data.get('user_id')
        )

        post.create_post()
    return jsonify({'message': 'Create post'})
