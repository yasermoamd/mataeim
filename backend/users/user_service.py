"""
This module contains the service layer for the User model.
"""
def get_user_by_username(cls, username: str):
    return cls.query.filter_by(username=username).first()