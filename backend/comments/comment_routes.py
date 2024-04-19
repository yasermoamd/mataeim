from flask import Blueprint, request, jsonify
from util.extensions import db
from posts.post_model import Post
from .comment_model import Comment
from users.user_model import User
from posts.post_model import Post
from flask_jwt_extended import jwt_required, get_jwt_identity
comment_routes = Blueprint('comments', __name__)

# get posts
@comment_routes.route('/', methods=['GET'])
@jwt_required()
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.serialize() for comment in comments])

@comment_routes.route('/create', methods=['POST'])
@jwt_required()
def create_comment():
    data = request.get_json()
    # check user id from the jwt header
    current_user_id = get_jwt_identity()
    user = User.get_user_by_id(current_user_id)
    post_id=data.get("post_id")
    content = data.get("content")
    post = Post.get_post_by_id(post_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404
    
    if not post:
        return jsonify({"Error": "Post_id not founded"}), 404
    comment = Comment(content = content,
                      user_id = current_user_id,
                      post_id = post_id
                                        )
    comment.create_comment()
    return jsonify({"comment": 'Comment created'})
