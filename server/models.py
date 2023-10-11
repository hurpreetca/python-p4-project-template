from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import re
from config import db, bcrypt

# Models go here!

discussion_tag = db.Table(
    "discussion_tags",
    db.Column("discussion_id", db.ForeignKey("discussions.id"), primary_key=True),
    db.Column("tag_id", db.ForeignKey("tags.id"), primary_key=True))

class User(db.Model):
    __tablename__ = "users"
    

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String) #UNDERSCORE IS A SIGN THAT THE VARIABLE OR METHOD IS FOR INTERNAL USE ONLY 
    date_joined= db.Column(db.DateTime, server_default=db.func.now())
    discussions = db.relationship("Discussion", backref= "user")
    comments = db.relationship("Comment", backref= "user")

    def __repr__(self):
        return f"<ID:{self.id}, NAME:{self.name}, EMAIL:{self.email}>"
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Access Forbidden!")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, provided_password):
        return bcrypt.check_password_hash(self._password_hash, provided_password.encode("utf-8"))

    #VALIDATIONS FOR NAME AND EMAIL
    @validates("name")
    def validate_name(self, key, name):
        pattern = r"^[a-zA-Z]+ [a-zA-Z]+$"
        if not re.match(pattern, name):
            raise ValueError("Invalid Input. Only letters and single spaces are allowed.")
        return name
    
#regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    @validates("email")
    def validate_email(self, key, email):
        pattern = r"([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+" 
        if not re.match(pattern, email):
            raise ValueError("Invalid email added")
        return email

class Discussion(db.Model):
    __tablename__ = "discussions"

    id = db.Column(db.Integer, primary_key=True)
    discussion_topic = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comments = db.relationship("Comment", backref="discussion",cascade="all,delete-orphan")
    tags= db.relationship("Tag", secondary=discussion_tag, back_populates="discussions")

    def __repr__(self):
        return f"<ID:{self.id}, DISCUSSION-TOPIC:{self.discussion_topic}>"


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String)
    discussions= db.relationship("Discussion", secondary=discussion_tag, back_populates="tags")

    def __repr__(self):
        return f"<ID:{self.id}, CATEGORY:{self.category}>"

class Comment(db.Model):
    __tablename__ = "comments"

    id= db.Column(db.Integer, primary_key=True)
    comment_text= db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate= db.func.now())


    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    discussion_id = db.Column(db.Integer, db.ForeignKey("discussions.id"))
    def __repr__(self):
        return f"<ID:{self.id}, COMMENT-TEXT:{self.comment_text}>"
    



