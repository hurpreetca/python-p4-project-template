#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, request, make_response, jsonify, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, api, ma , db
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

        errors = []
        keys = ["name", "email", "password_hash"]

        for key in keys:
            if not json[key]:
                errors.append(f"{key} is required")


        if json.get("password_hash"):
            #setter method(password_hash) = (password from client side)
            user.password_hash = json.get("password_hash")
            
        else:
            return {"errors": "Passwords do not match"}, 422

        try:
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id
            return singular_user_schema.dump(user), 201

        except IntegrityError as e:

            if isinstance(e, (IntegrityError)):
                for error in e.orig.args:
                    if "UNIQUE" in error:
                        errors.append("Email already taken. Please try again")

            return {"errors": ["Errors"]}
api.add_resource(Signup, "/signup")


class Login(Resource):
    def post(self):
        json = request.get_json()
        email = json.get("email")
        password = json.get("password_hash")

        if not email or not password:
            return {"errors": ["Email and password are required"]}, 400

  
        user = User.query.filter_by(email=email).first()

        if not user:
            return {"errors": ["Email not found"]}, 404


        if not user.authenticate(password):
            return {"errors": ["Incorrect password"]}, 401

        session["user_id"] = user.id
        return singular_user_schema.dump(user), 200

api.add_resource(Login, "/login")

class CurrentUser(Resource):
    def get(self):
 
        user_id = session.get("user_id")

    
        if not user_id:
            return {"errors": ["No user is currently logged in"]}, 401


        user = User.query.get(user_id)


        if not user:
            return {"errors": ["User not found"]}, 404


        return singular_user_schema.dump(user), 200

api.add_resource(CurrentUser, "/current_user")


class Logout(Resource):
    def delete(self): 

        session.pop("user_id", None)
        return {"message": "Logged out successfully"}, 200

api.add_resource(Logout, "/logout")

class Discussions(Resource):
    def get(self):
        discussion_list = [singular_discussion_schema.dump(discussion) for discussion in Discussion.query.all()]
        return {"discussion_list": discussion_list}, 200
    def post(self):
        discussion_topic = request.form.get("discussion_topic")
        tags = request.form.get("tags")
        
api.add_resource(Discussions, "/discussions")

class DiscussionById(Resource):
    def get(self,id ):
        comments_list = [plural_comment_schema.dump(comment) for comment in Comment.query.all()]

        
    def patch(self, id):
        data = request.get_json()

        discussion = Discussion.query.filter_by(Discussion.id == id).first()
    pass

    def delete(self, id):
        discussion = Discussion.query.filter_by(Discussion.id == id).first()
        if not discussion:
            return {"error": "Discussion not found"}, 404
        # for comments
        comment = Comment.query.filter_by(Discussion.id == id).all()




if __name__ == '__main__':
    app.run(port=5555, debug=True)

