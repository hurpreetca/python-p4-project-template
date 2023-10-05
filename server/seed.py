#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from config import db, app  
from models import User, Discussion, Comment

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
