from extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
class User(db.Model):
    __tablename__ = 'users'
    id : str= db.Column(db.String, primary_key=True, default=lambda: str(uuid4()))
    username: str = db.Column(db.String(50), unique=True, nullable=False)
    email: str = db.Column(db.String(50), unique=True, nullable=False)
    password: str = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def hash_pass(self, password: str) -> str:
        if password is not None:
            self.password = generate_password_hash(password)
        else:
            raise ValueError('Password is empty')
    
    def compare_pass(self, password: str) -> bool:
        return check_password_hash(self.password, password)

    @classmethod
    def get_user_by_username(cls, username: str):
        return cls.query.filter_by(username=username).first()

    def register_user(self):
        db.session.add(self)
        db.session.commit()
    
    def update_user(self):
        db.session.delete(self)
        db.session.commit()