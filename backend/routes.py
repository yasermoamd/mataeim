from flask import Blueprint, request, jsonify
from extensions import db
from models import User

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    
    data = request.get_json()

    user = User.get_user_by_username(username=data.get('username'))

    if user is not None:
        return jsonify({'message': 'User already exists'})
    
    user = User(
        username=data.get('username'),
        email=data.get('email')
    )
    user.hash_pass(password=data.get('password'))
    user.register_user()

    return jsonify({'message': 'User created'})

@auth_bp.route('/login', methods=['GET'])
def login():
    return jsonify({'message': 'Login'})



@auth_bp.route('/logout')
def logout():
    return jsonify({'message': 'Logout'})