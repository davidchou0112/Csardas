import os
from flask import Flask, render_template, request, session, redirect, jsonify, Blueprint
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_required, current_user
from .models import db, User, Image, Comment, Like, Tag
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .seeds import seed_commands
from .config import Config

from .boto3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

# image_routes = Blueprint("images", __name__)

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# boto3 aws
# print('~~~~~~~~am i getting here 1')
@app.route("/api/users/aws", methods=["POST"])
def upload_image():
    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400
    image = request.files["image"]

    if not allowed_file(image.filename):
        print('did i get here 1')
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        print('did i get here 2')
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # print("-----------", url)
    return url

# print('~~~~~~~~~am i getting here 3')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


# ============ Get all users =============
@app.route('/api/users')
# @login_required
def get_all_users():
    all_users = []
    data = User.query.all()
    for user in data:
        all_users.append(user.to_dict())
    return jsonify(all_users)

# =========== Get single user by id ==========
@app.route('/api/users/<int:id>')
# @login_required
def get_user(id):
    # print(request, 'this is request')
    data = User.query.get(id).to_dict()
    return data


# ========= Get all Images =========
@app.route('/api/images')
# @login_required
def get_images():
    all_images = []
    data = Image.query.all()
    for image in data:
        all_images.append(image.to_dict())
    return jsonify(all_images)

# ========= Get single Image ==========
@app.route('/api/images/<int:image_id>')
# @login_required
def get_single_image(image_id):
    image = Image.query.get(image_id)
    if not image:
        return {
            "message": "Image couldn't be found",
            "statusCode": 404,
        }, 404
    return image.to_dict()

# ========== Create an Image ===========
@app.route('/api/users/<int:user_id>/images', methods=["POST"])
# @login_required
def post_new_image(user_id):
    data = request.get_json()
    new_image = Image(
        title = data['title'],
        description = data['description'],
        image_url = data['image_url'],
        user_id = user_id
    )
    
    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()


# ========== Update an Image ===========
# @login_required
@app.route('/api/images/<int:id>', methods=["PUT"])
def update_image(id):
    test = upload_image()
    
    image = Image.query.get(id)
    # print('~~~this is image1:~~~:', image)
    
    # print('what type is this image', type(image))
    # print('~~~this is image2:~~~:', image)
    if not image:
        return {
            "message": "Watchlist not found",
            "statusCode": 404,
        }, 404
    data = request.get_json()
    
    # print('~~~~does it get here~~~ this is data:', data)
    
    image.title = data['title']
    # print('~~~this is image.title:', image.title)
    image.description = data['description']
    # image.image_url = data['image_url']
    image.image_url = test
    

    db.session.commit()
    # print('~~~images after session commit ~~~:', image)
    return image.to_dict()


# ========== Delete an Image ===========
@app.route('/api/images/<int:id>', methods=["DELETE"])
# @login_required
def delete_image(id):
    image = Image.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return 'Image successfully deleted.'


# ========= Get all Comments ==========
@app.route('/api/users/<int:user_id>/comments')
# @login_required
def get_user_comments(user_id):
    all_comments = []
    data = Comment.query.filter(Comment.user_id == user_id).all()
    for lst in data:
        all_comments.append(lst.to_dict())
    return jsonify(all_comments)

# ========== Get Comment by Id ==========
@app.route('/api/comments/<int:id>')
# @login_required
def get_comments_by_id(id):
    comment = Comment.query.get(id)
    if not comment:
        return {
            "message": "Watchlist not found",
            "statusCode": 404,
        }, 404
    return comment.to_dict()

# ========== Update a Comment =========
@app.route('/api/comments/<int:id>', methods=["PUT"])
# @login_required
def update_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {
            "message": "Watchlist not found",
            "statusCode": 404,
        }, 404
    data = request.get_json()
    comment.body = data['body']
    db.session.commit()
    
    return comment.to_dict()

# =========== Create a Comment ==========
@app.route('/api/users/<int:user_id>/images/<int:image_id>/comments', methods=["POST"])
# @login_required
def post_new_comment(user_id, image_id):
    data = request.get_json()
    new_comment = Comment(
        user_id = user_id,
        image_id = image_id,
        body = data['body']
    )
    
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()

# ========== Delete a Comment ===========
@app.route('/api/comments/<int:id>', methods=["DELETE"])
# @login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return 'Comment has successfully been deleted'

# ============= Always leave these two at the bottom of the file page =============

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')