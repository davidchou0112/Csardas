from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    watchlists = db.relationship("Watchlist", back_populates="user")
    stocks = db.relationship("Transaction", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def get_id(self):
    #     return super().get_id()

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'watchlists': self.list_to_dict(),
            'stocks':self.list_to_dict_stocks()
        }

    def list_to_dict(self):
        ls_dict = {}
        for ls in self.watchlists:
            ls_dict[ls.to_dict()['id']] = ls.to_dict()
        return ls_dict

    def list_to_dict_stocks(self):
        ls_dict = {}
        for ls in self.stocks:
            ls_dict[ls.to_dict()['id']] = ls.to_dict()
        return ls_dict