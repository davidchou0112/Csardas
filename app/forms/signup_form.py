from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    if not email.__contains__('@' and '.'):
        raise ValidationError('Should be in email format')
    
def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    if len(username) < 4 or len(username) > 12:
        raise ValidationError(
            'Username should be betweeen 4 and 12 characters.')
        
def firstname_valid(form, field):
    # Checking firstname length
    firstname = field.data
    if len(firstname) < 1 or len(firstname) > 20:
        raise ValidationError('First name should be betweeen 1 and 20 charaters.')

def lastname_valid(form, field):
        # Checking lastname length
    lastname = field.data
    if len(lastname) < 1 or len(lastname) > 20:
        raise ValidationError('Last name should be betweeen 1 and 20 charaters.')

def password_valid(form, field):
    # Checking password length
    password = field.data
    if len(password) < 6 or len(password) > 20:
        raise ValidationError('Password should be betweeen 6 and 20 charaters.')

# def email_valid(form, field):
#     email = field.data
#     if(len(email) < 1 or len(email)) > 20: 
#         raise ValidationError('Must have email that is less than 20 characters.')
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError{
#             'Email is already in use.'
#         }
#     if not email.__contains__('@' and '.'):
#         raise ValidationError('Should be in email format')
    
    

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname= StringField('lastname', validators=[DataRequired()])
