from flask import Blueprint, request, jsonify
from users.user_model import User
from .user_service import authenticate
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from flask_cors import cross_origin

user_routes = Blueprint('auth', __name__)

user_routes.blacklisted_tokens = set()
@user_routes.route('/users/register', methods=['POST'])
@cross_origin(supports_credentials=True)
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

@user_routes.route('/users/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}),400
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email:
        return jsonify({"msg": "Missing email parameter"}),400
    if not password:
        return jsonify({"msg": "Missing password parameter"}),400
    user = authenticate(email, password)
    if not user:
        return jsonify({"msg": "Wrong username or password"}), 401
    # create access token and return it 
    access_token = create_access_token(identity=user.id)
    return jsonify({
        "id": user.id,
        "access_token":access_token
    }), 200

# get users
@user_routes.route('/users', methods=["GET"])
@jwt_required()
def get_users():
    # get all User
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@user_routes.route('/users/<id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.filter_by(id=id).first()
    
    if user is None:
        return jsonify({'message': f"User with ID {id} not found"}), 404
    user_data = {
    "id": user.id,
    "fullname": user.fullname,
    "email": user.email,
    # Add other relevant user attributes
    }
    return jsonify(user_data), 200


@user_routes.route('/users/logout', methods=['POST'])
@jwt_required()
def logout():
  jti = get_jwt()['jti']

  # Implement blacklist logic using your chosen storage mechanism (e.g., database)
  # This code snippet is just an example, replace it with your actual implementation
  try:
    # Connect to your chosen storage (e.g., Redis)
    blacklist_store = connect_to_blacklist_store()
    blacklist_store.add(jti)  # Add JTI to the blacklist
  except Exception as e:
    print(f"Error adding token to blacklist: {e}")
    # Handle connection or storage errors gracefully (consider logging)

  return jsonify({'message': 'Successfully logged out'}), 200
