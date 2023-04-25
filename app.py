import os
from flask import Flask, request, jsonify, send_from_directory
from models import db, User
from flask_cors import  CORS
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
from flask_bcrypt import Bcrypt, generate_password_hash,check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

upload_folder = os.path.join('static', 'upload')
app = Flask(__name__)
app.config ['UPLOAD'] = upload_folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['JWT_SECRET_KEY'] = "jwt-protect-4geeks"
db.init_app(app)

migrate = Migrate(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app) 
CORS(app)

@app.route("/")
def home():
    return "backend python"

@app.route("/users", methods=["POST"])
def create_user():
    user = User()
    user.name = request.json.get("name")
    user.lastname = request.json.get("lastname")
    user.username = request.json.get("username")
    user.email = request.json.get("email")
    password = request.json.get("password")
    password_hash = generate_password_hash(password)
    user.password = password_hash

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User Created"}), 200

@app.route("/users/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    user = User.query.filter_by(username=username).first()
    if user is not None:
        is_valid = check_password_hash(user.password, password)
        if is_valid:
            access_token = create_access_token(identity=username)
            return jsonify({
                "token":access_token
            }),200
        else:
            return jsonify({
                "msg":"User or password not exist or not valid"
            }), 400


@app.route("/users/list", methods=["GET"])
def get_users():
    users = User.query.all()
    result = []
    for user in users:
        result.append(user.serialize())
    return jsonify(result)

@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get(id)
    if user is not None:
        return jsonify({
            "name": user.name,
            "lastname": user.lastname,
            "username": user.username,
            "email": user.email
            })
    else:
        return jsonify({"message": "User with ID {id} not found."}), 404



@app.route("/users/<int:id>", methods=["PUT", "DELETE"])
def update_user(id):
    user = User.query.get(id)
    if user is not None:
        if request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()

            return jsonify("Deleted"), 204
        else:
            user.name = request.json.get("name")
            user.lastname = request.json.get("lastname")
            user.username = request.json.get("username")
            user.email = request.json.get("email")
            user.password = request.json.get("password")
            
            db.session.commit()
            
            return jsonify("User updated"), 200
    
    return jsonify("User not found"), 418

@app.route ("/image/<int:id>", methods=["POST", "GET"])
def image(id):
    if request.method =="GET":
        user = User.query.get(id)
        image = user.image
        return send_from_directory(app.config['UPLOAD'], image)
    else: 
        if 'file' not in request.files:
            print(request.files)
            return jsonify ({'error':'no files selected'}), 400
        else:
            print(request.files)
            file = request.files['file']
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD'], filename))
            user = User.query.get(id)
            user.image = filename
            db.session.commit()
            return jsonify({'msg':'image saved'}), 200

if __name__== "__main__":
    app.run(host="localhost", port="5000")