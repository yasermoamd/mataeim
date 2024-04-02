"""
Copyright (c) 2024 - present tasteway
"""

from flask import Flask
from extensions import db
from router.main import main_bp
from router.auth import auth_bp

app = Flask(__name__)
"""
  create_app - function to create app instance and routes register
  :return: app instance
"""

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasteway.db"
app.config["SECRET_KEY"] = "CXGWWwO/VfH14hH2ID2NsSNQR0K6WOmlhuKZ+4tdEHk="

# register routes blueprints
app.register_blueprint(main_bp, url_prefix="/")
app.register_blueprint(auth_bp, url_prefix="/auth")
db.init_app(app)


if __name__ == "__main__":
    app.debug = True
    app.run()