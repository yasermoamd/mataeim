from util.extensions import db
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    content = db.Column(db.Text(), nullable=False)
    post_id = db.Column(db.String, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    post = relationship('Post', back_populates='comments')
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def __repr__(self):
        return f'<Comment {self.content}>'

    @classmethod
    def get_comment_by_id(cls, comment_id: str):
        return cls.query.filter_by(id=comment_id).first()

    def create_comment(self):
        db.session.add(self)
        db.session.commit()