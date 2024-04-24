"""
This module contains the service layer for the User model.
"""
def get_user_by_username(cls, email: str):
    return cls.query.filter_by(email=email).first()

def authenticate(email, password):
    from .user_model import User
    user = User.query.filter_by(email=email).first()
    if not user:
        return None
    # Do the passwords match
    if not user.compare_pass(password):
        return None
    return user