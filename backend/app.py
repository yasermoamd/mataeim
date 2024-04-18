"""
This script creates a Flask app and initializes the database.
"""

import os
from flask import Flask, request, jsonify
from util.extensions import db
from users.user_routes import user_routes
from posts.post_routes import post_routes
from comments.comment_routes import comment_routes
from config import DevConfig
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
"""
Create a Flask app with the following configurations:
- SECRET_KEY
- SQLALCHEMY_DATABASE_URI
- SQLALCHEMY_TRACK_MODIFICATIONS
- SQLALCHEMY_ECHO
- Register blueprints
- Initialize database
"""

jwt = JWTManager()
def create_app():
    # Create Flask app
    app = Flask(__name__)

    # add configuration setting
    app.config.from_object(DevConfig)

    # Register blueprints
    app.register_blueprint(user_routes, url_prefix='/api/auth')
    app.register_blueprint(post_routes, url_prefix='/api/posts')
    app.register_blueprint(comment_routes, url_prefix='/api/comments')
    # Initialize database
    db.init_app(app)
    migrate = Migrate(app, db)
    # Create database and tables
    with app.app_context():
        db.create_all()
    # initialization of the extension is going to be made on the auth module.
    jwt.init_app(app)
    # list all endpoints 
    @app.route('/list_endpoints', methods=['GET'])
    def list_endpoints():
        routes = []
        for rule in app.url_map.iter_rules():
            if rule.endpoint != 'static':
                routes.append({
                    'endpoint': rule.endpoint,
                    'methods': ', '.join(rule.methods),
                    'path': str(rule)
                })
        
        return jsonify({'routes': routes})
    return app

quotes_app = create_app()
# Run the Flask app if this script is executed directly
if __name__ == "__main__":
    quotes_app.run()


