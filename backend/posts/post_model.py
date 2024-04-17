from util.extensions import db
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='posts')
    comments = relationship('Comment', back_populates='post')
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def __repr__(self):
        return f'<Post {self.title}>'

    @classmethod
    def get_post_by_id(cls, post_id: str):
        return cls.query.filter_by(id=post_id).first()

    def create_post(self):
        db.session.add(self)
        db.session.commit()

