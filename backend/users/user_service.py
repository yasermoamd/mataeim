"""
This module contains the service layer for the User model.
"""
def get_user_by_username(cls, fullname: str):
    return cls.query.filter_by(fullname=fullname).first()

def authenticate(fullname, password):
    from .user_model import User
    user = User.query.filter_by(fullname=fullname).first()
    if not user:
        return None
    # Do the passwords match
    if not user.compare_pass(password):
        return None
    return user