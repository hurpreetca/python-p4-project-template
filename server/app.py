#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, request, make_response, jsonify, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api, ma 
from models import User, Discussion, Comment



class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    
    id = ma.auto_field()
    name = ma.auto_field()
    email = ma.auto_field()
    date_joined = ma.auto_field()
    _password_hash = ma.auto_field()
    discussions = ma.Nested()

singular_user_schema = UserSchema(only=("id", "name", "email", "date_joined", "discussions"))
plural_user_schema = UserSchema(only=("id", "name", "email", "date_joined", "discussions"),many=True)

class DiscussionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Discussion
    
    id = ma.auto_field()
    discussion_topic = ma.auto_field()
    category = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()
    comments = ma.Nested()



singular_discussion_schema = DiscussionSchema()
plural_discussion_schema = DiscussionSchema(many=True)

class CommentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Comment
    
    id = ma.auto_field()
    discussion_topic = ma.auto_field()

singular_comment_schema = CommentSchema()
plural_comment_schema = CommentSchema(many=True)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

