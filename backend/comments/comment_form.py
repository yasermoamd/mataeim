from flask_wtf import FlaskForm as Form
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class CommentForm(Form):
    text = TextAreaField(u'content', validators=[DataRequired()])
    submit = SubmitField('Submit')