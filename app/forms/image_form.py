# from flask_wtf import FlaskForm
# from wtforms import StringField, SubmitField, IntegerField
# from wtforms.validators import DataRequired, Length, NumberRange

# class ImageForm(FlaskForm):
#   title = StringField('title', validators=[DataRequired(), Length(min=1, max=100)])
#   description = StringField('description', validators=[DataRequired(), Length(min=1, max=1000)])
#   imageUrl = StringField('imageUrl', validators=[DataRequired(), Length(min=1, max=1000)])
#   userId = IntegerField('userId', validators=[DataRequired(), NumberRange(min=1, max=1000)])
#   submit = SubmitField('Submit')
  
# # class ImageForm(FlaskForm):
# # image_url = TextField(validators=[URL(require_tld=True, message='Must be a valid URL')])
