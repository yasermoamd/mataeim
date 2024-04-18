from datetime import timedelta
class Config:
    # You can define any common configurations here
    pass


class DevConfig(Config):
    FLASK_SECRET_KEY="LKDHFA8E3LKNAKFJQU3INFD"
    JWT_SECRET_KEY="LKDHFA8E3LKNAKFJQU3INFD"
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(hours=1)  # Token expiration time
    FLASK_DEBUG=True
    FLASK_ENV="development"
    SQLALCHEMY_DATABASE_URI="sqlite:///quote.sqlite3"
    FLASK_SQLALCHEMY_ECHO=True
    FLASK_SQLALCHEMY_TRACK_MODIFICATIONS=False