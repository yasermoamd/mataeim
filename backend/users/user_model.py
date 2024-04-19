from util.extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'
    id : str = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    fullname: str = db.Column(db.String(50), unique=True, nullable=False)
    email: str = db.Column(db.String(50), unique=True, nullable=False)
    password: str = db.Column(db.Text(), nullable=False)
    posts = relationship('Post', back_populates='user')
    comments = relationship('Comment', back_populates='user')
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())


    def __repr__(self):
        return f'<User {self.fullname}>'

    def hash_pass(self, password: str) -> str:
        if password is not None:
            self.password = generate_password_hash(password)
        else:
            raise ValueError('Password is empty')
    
    def compare_pass(self, password: str) -> bool:
        return check_password_hash(self.password, password)

    @classmethod
    def get_user_by_id(cls, id: str):
        return cls.query.filter_by(id=id).first()
    @classmethod
    def get_user_by_email(cls, email: str):
        return cls.query.filter_by(email=email).first()

    def register_user(self):
        db.session.add(self)
        db.session.commit()
    
    def update_user(self):
        db.session.delete(self)
        db.session.commit()
    def serialize(self):
        return{
            'id': self.id,
            'fullname': self.fullname,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
