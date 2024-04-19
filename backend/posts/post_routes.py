from flask import Blueprint, request, jsonify
from util.extensions import db
from posts.post_model import Post
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=['GET'])
@jwt_required()
def get_posts():
    posts = Post.query.all()
    return jsonify([post.serialize() for post in posts])

@post_routes.route('/create', methods=['POST'])
@jwt_required()
def create_post():
    # check user id from the jwt header
    current_user_id = get_jwt_identity()
    data = request.get_json()
    title=data.get('title')
    content=data.get('content')
    user_id=current_user_id
    if not title or not content:
        return jsonify({'Error': 'title and content are required'}), 400
    post = Post(  
        title=data.get('title'),
        content=data.get('content'),
        user_id=user_id
    )

    post.create_post()
    return jsonify({'message': 'Create post'})
