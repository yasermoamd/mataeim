"""
This script creates a Flask app and initializes the database.
"""

import os
from flask import Flask, request, jsonify
from util.extensions import db
from users.user_routes import user_routes
from posts.post_routes import post_routes
from comments.comment_routes import comment_routes

"""
Create a Flask app with the following configurations:
- SECRET_KEY
- SQLALCHEMY_DATABASE_URI
- SQLALCHEMY_TRACK_MODIFICATIONS
- SQLALCHEMY_ECHO
- Register blueprints
- Initialize database
"""
def create_app():
    # Create Flask app
    app = Flask(__name__)

    # Load environment variables
    app.config.from_prefixed_env()
    app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('FLASK_SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =  os.environ.get('FLASK_SQLALCHEMY_TRACK_MODIFICATIONS')
    app.config['SQLALCHEMY_ECHO'] = os.environ.get('FLASK_SQLALCHEMY_ECHO')

    # Register blueprints
    app.register_blueprint(user_routes, url_prefix='/api/auth')
    app.register_blueprint(post_routes, url_prefix='/api/posts')
    app.register_blueprint(comment_routes, url_prefix='/api/comments')
    # Initialize database
    db.init_app(app)

    return app

quotes_app = create_app()
# Run the Flask app if this script is executed directly
if __name__ == "__main__":
    quotes_app.run()
