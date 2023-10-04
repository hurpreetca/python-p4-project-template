from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_bcrypt import Bcrypt

from config import db

# Models go here!

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    comments = db.relationship("Comment", backref= "user")

    def __repr__(self):
        return f"<ID:{self.id}, NAME:{self.name}, EMAIL:{self.email}>"
    
    @hybrid_property
    def password_hash(self):


user_discussion= db.Table(
    "user_discussions",
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True)
    )

class Discussion(db.Model):
    __tablename__ = "discussions"

    id = db.Column(db.Integer, primary_key=True)
    discussion_topic = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())
    comments = db.relationship("Comment", backref= "discussion")


class Comment(db.Model):
    __tablename__ = "comments"

    id= db.Column(db.Integer, primary_key=True)
    comment_text= db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    discussion_id =  db.Column(db.Integer, db.ForeignKey("discussions.id"))




