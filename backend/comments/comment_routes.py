from flask import Blueprint, request, jsonify
from util.extensions import db
from posts.post_model import Post
from .comment_model import Comment
from .comment_form import CommentForm
from users.user_model import User
from flask_jwt_extended import jwt_required, get_jwt_identity
comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['GET'])
@jwt_required()
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.__dict__ for comment in comments])

@comment_routes.route('/create', methods=['POST'])
@jwt_required()
def create_comment():
    # check user id from the jwt header
    current_user_id = get_jwt_identity()
    user = User.get_user_by_id(current_user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404
    form = CommentForm()
    if form.validate_on_submit():
        content = form.content.data
        comment = Comment(content = content, user_id = user.id)
        comment.create_comment()
        return jsonify({"message": "Comment created successfully", "comment": comment.__dict__}), 201
    else:
        return jsonify({"error": "Validation error", "errors": form.errors}), 400

        
    # if request.method == 'POST':
    #     data = request.get_json()

    #     comment = Comment(
    #         content=data.get('content'),
    #         post_id=data.get('post_id'),
    #         user_id=data.get('user_id')
    #     )
    #     comment.create_comment()
    # return jsonify({'message': 'Create comment'})