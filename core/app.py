from flask import Flask
from .extentions import db
from .router.main import main_bp
from .router.auth import auth_bp


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasteway.db"
    app.config["SECRET_KEY"] = "CXGWWwO/VfH14hH2ID2NsSNQR0K6WOmlhuKZ+4tdEHk="

    # register routes blueprints
    app.register_blueprint(main_bp, url_prefix="/")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    db.init_app(app)

    app.debug = True
    return app
