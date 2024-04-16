from flask import Flask, request, jsonify
from extensions import db
from routes import auth_bp


def create_app():
    
    app = Flask(__name__)
    app.config.from_prefixed_env()

    app.register_blueprint(auth_bp, url_prefix='/api')
    db.init_app(app)
    return app