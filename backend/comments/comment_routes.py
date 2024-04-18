from flask import Blueprint, request, jsonify
from util.extensions import db
from posts.post_model import Post
from .comment_model import Comment
from .comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.__dict__ for comment in comments])

@comment_routes.route('/create', methods=['POST'])
def create_comment():
    form = CommentForm()
    if form.validate_on_submit():
        
    # if request.method == 'POST':
    #     data = request.get_json()

    #     comment = Comment(
    #         content=data.get('content'),
    #         post_id=data.get('post_id'),
    #         user_id=data.get('user_id')
    #     )
    #     comment.create_comment()
    # return jsonify({'message': 'Create comment'})