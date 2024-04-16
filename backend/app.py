from flask import Flask, request, jsonify
from extensions import db
from routes import auth_bp




def create_app():
    DATABASE_URL = "sqlite:///mydatabase.db"
    app = Flask(__name__)
    app.config.from_prefixed_env()
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.register_blueprint(auth_bp, url_prefix='/api')
    db.init_app(app)
    return app

quotes_app = create_app()
# Run the Flask app if this script is executed directly
if __name__ == "__main__":
    quotes_app.run()
