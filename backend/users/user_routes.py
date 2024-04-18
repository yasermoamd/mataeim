from flask import Blueprint, request, jsonify
from util.extensions import db
from users.user_model import User
from .user_service import authenticate
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
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

@user_routes.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),400
    fullname = request.json.get('fullname', None)
    password = request.json.get('password', None)
    if not fullname:
        return jsonify({"msg": "Missing fullname parameter"}),400
    if not password:
        return jsonify({"msg": "Missing password parameter"}),400
    user = authenticate(fullname, password)
    if not user:
        return jsonify({"msg": "Wrong username or password"}), 401
    # create access token and return it 
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200



@user_routes.route('/logout')
def logout():
    return jsonify({'message': 'Logout'})

# get users
@user_routes.route('/', methods=["GET"])
@jwt_required()
def get_users():
    # get all User
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
    return jsonify(user_list), 200