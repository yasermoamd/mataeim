from flask import Blueprint, request, jsonify
from util.extensions import db
from users.user_model import User

user_routes = Blueprint('auth', __name__)


@user_routes.route('/register', methods=['POST'])
def register():
    
    data = request.get_json()

    user = User.get_user_by_email(email=data.get('email'))

    if user is not None:
        return jsonify({'message': 'User already exists'})
    
    user = User(
        fullname=data.get('fullname'),
        email=data.get('email')
    )
    user.hash_pass(password=data.get('password'))
    user.register_user()

    return jsonify({'message': 'User created'})

@user_routes.route('/login', methods=['GET'])
def login():
    return jsonify({'message': 'Login'})



@user_routes.route('/logout')
def logout():
    return jsonify({'message': 'Logout'})