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
    _password_hash = ma.auto_field()

single_user_schema = UserSchema()
plural_user_schema = UserSchema(many=True)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

