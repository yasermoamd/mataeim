from flask import Flask
from .extentions import db

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = ""
    app.config["SECRET_KEY"] = ""

    db.init_app(app)

    return app