from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    firstname = db.Column(db.String(255), nullable=False)
    lastname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(500), nullable=False)

    image = db.relationship("Image", back_populates="user")
    tags = db.relationship('Tag', back_populates='user')
    comments = db.relationship("Comment", back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'hashed_password': self.hashed_password,
        }

class Image(db.Model):
    __tablename__ = 'images'
  
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship("User", back_populates="image")
    tags = db.relationship("Tag", back_populates='image', cascade='all, delete')
    comments = db.relationship("Comment", back_populates='image', cascade='all, delete')
    likes = db.relationship("Like", back_populates='image', cascade='all, delete')
    
    def to_dict(self):
        return {
            "id" : self.id,
            "title" : self.title,
            "description" : self.description,
            "image_url" : self.image_url,
            "user_id" : self.user_id,
            'likes': [like.to_dict() for like in self.likes],
            'tags': [tag.to_dict() for tag in self.tags],
            
    }

class Tag(db.Model, UserMixin):
    __tablename__ = 'tags'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable =False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False)
    
    image = db.relationship("Image", back_populates='tags')
    user = db.relationship("User", back_populates='tags')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'image_id': self.image_id
        }
        
class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(500), nullable =False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False)
    
    image = db.relationship("Image", back_populates='comments')
    user = db.relationship("User", back_populates='comments')
    
    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user_id,
            'image_id': self.image_id
        }
    def to_dict_user(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user_id,
            'image_id': self.image_id,
            'user': self.user.to_dict()
        }
        
class Like(db.Model, UserMixin):
    __tablename__ = 'likes'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False)
    
    image = db.relationship("Image", back_populates='likes')
    user = db.relationship("User", back_populates='likes')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_id': self.image_id
        }