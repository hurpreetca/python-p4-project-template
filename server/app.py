#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, request, make_response, jsonify, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, api, ma 
from models import User, Discussion, Comment, Tag
from flask import request, session
from flask_restful import Resource

class TagSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Tag

    id = ma.auto_field()
    category = ma.auto_field()

singular_tag_schema = TagSchema()
plural_tag_schema = TagSchema(many=True)


class CommentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Comment
    
    id = ma.auto_field()
    comment_text = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()
    user_id = ma.auto_field()
    discussion_id = ma.auto_field()

singular_comment_schema = CommentSchema()
plural_comment_schema = CommentSchema(many=True)


class DiscussionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Discussion
    
    id = ma.auto_field()
    discussion_topic = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()
    user_id = ma.auto_field()
    comments = ma.Nested(plural_comment_schema)
    tags = ma.Nested(plural_tag_schema)



singular_discussion_schema = DiscussionSchema()
plural_discussion_schema = DiscussionSchema(many=True)

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    
    id = ma.auto_field()
    name = ma.auto_field()
    email = ma.auto_field()
    date_joined = ma.auto_field()
    _password_hash = ma.auto_field()
    discussions = ma.Nested(plural_discussion_schema)
    comments= ma.Nested(plural_comment_schema)

singular_user_schema = UserSchema(only=("id", "name", "email", "date_joined", "discussions"))
plural_user_schema = UserSchema(only=("id", "name", "email", "date_joined", "discussions"),many=True)


#####VIEWS#####VIEWS#####VIEWS#####VIEWS#####VIEWS#####VIEWS#####VIEWS#####
class Signup(Resource):
    def post(self):
        json = request.get_json()

        user = User(name= json.get("name"), email= json.get("email"))







if __name__ == '__main__':
    app.run(port=5555, debug=True)

