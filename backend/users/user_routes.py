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

# get users
@user_routes.route('/')
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_dict = {
            'id': user.id,
            'fullname': user.fullname,
            'email': user.email,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        }
        user_list.append(user_dict)
    return jsonify(user_list)