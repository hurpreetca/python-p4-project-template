#!/usr/bin/env python3

import random
from random import randint, choice as rc, sample
from faker import Faker
from config import db, app  
from models import *

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting all data")
        
        User.query.delete()
        Discussion.query.delete()
        Comment.query.delete()
        Tag.query.delete()
        db.session.query(discussion_tag).delete()


        print("...Creating Users...")

        user1 = User(name= "first user", email="user1@example.com")
        user1.password_hash = "user1" + "password"
        user2 = User(name= "second user", email="user2@example.com")
        user2.password_hash = "user2" + "password"
        user3 = User(name= "third user", email="user3@example.com")
        user3.password_hash = "user3" + "password"
        user4 = User(name= "fourth user", email="user4@example.com")
        user4.password_hash = "user4" + "password"

        db.session.add_all([user1, user2, user3, user4])
        db.session.commit()


        print("...Creating Discussions...")
        discussion_data = [
            Discussion(discussion_topic="The Art of Cooking: Culinary Tips and Techniques", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Literature and Its Influence on Society", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Mental Health Stigma: Breaking the Silence", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Exploring World History: Ancient Civilizations", user_id = random.randint(1,4)),
            Discussion(discussion_topic="The Future of Renewable Energy Sources", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Entrepreneurship in the Digital Age", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Music Across Cultures: A Universal Language", user_id = random.randint(1,4)),
            Discussion(discussion_topic="The Impact of Urbanization on Wildlife", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Human Rights and Social Justice Movements", user_id = random.randint(1,4)),
            Discussion(discussion_topic="The Beauty of Underwater Ecosystems", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Mindfulness and Meditation for Stress Relief", user_id = random.randint(1,4)),
            Discussion(discussion_topic="The World of Competitive Gaming (Esports)", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Sustainable Fashion: Style with a Purpose", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Exploring the Marvels of Astronomy", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Traditional Medicine vs. Modern Healthcare", user_id = random.randint(1,4)),
            Discussion(discussion_topic="The Evolution of Dance Styles", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Cuisine from Around the Globe", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Environmental Conservation Efforts Worldwide", user_id = random.randint(1,4)),
            Discussion(discussion_topic="The Art of Public Speaking and Communication", user_id = random.randint(1,4)),
            Discussion(discussion_topic="Innovations in Artificial Intelligence and Robotics", user_id = random.randint(1,4)),
        ]
        db.session.add_all(discussion_data)
        db.session.commit()


        print("...Creating Comments...")
        comment_data = [
            Comment(comment_text="AI and robotics are transforming industries. What do you think is the most exciting AI application right now?", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="As a computer science student, I'm always eager to learn about the latest advancements in AI. Any recent breakthroughs that caught your eye?", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="I've been trying to switch to sustainable fashion brands. Any recommendations for eco-friendly clothing companies?", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="Fast fashion is such a problem. We need more discussions like this to promote conscious consumer choices!", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="Ancient Egypt has always fascinated me. The architecture, mythology, and the mysteries of the pyramids are mind-blowing!", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="I'm a history buff, and I love reading about lesser-known ancient civilizations. Do you have any favorite historical books or documentaries?", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="It's crucial that we continue to raise awareness about mental health and provide support. Let's end the stigma!", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="I've struggled with anxiety for years, and it's reassuring to see more open conversations about mental health. Thanks for sharing.", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="I've been experimenting with different cuisines lately. Any favorite tips or recipes you'd recommend for a newbie chef?", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
            Comment(comment_text="Cooking is such a creative outlet for me. I love trying new ingredients and techniques. What's your signature dish?", user_id = random.randint(1,4), discussion_id = random.randint(1,20)),
        ]
        db.session.add_all(comment_data)
        db.session.commit()


        print("...Creating Tags...")
        tag_data = [
            Tag(category="Technology"),
            Tag(category="Science"),
            Tag(category="Health"),
            Tag(category="Environment"),
            Tag(category="Culture"),
            Tag(category="Entertainment"),
            Tag(category="Sports"),
            Tag(category="Education"),
            Tag(category="Travel"),
            Tag(category="Food"),
            Tag(category="Books"),
            Tag(category="Art"),
            Tag(category="Politics"),
            Tag(category="Business"),
            Tag(category="History"),
            Tag(category="Gaming"),
            Tag(category="Music"),
            Tag(category="DIY"),
            Tag(category="Fashion"),
        ]
        db.session.add_all(tag_data)
        db.session.commit()

        print("...Creating relationships...")
        discussions = Discussion.query.all()
        tags = Tag.query.all()

        num_discussion_prefs = randint(1, len(discussions)) 
        num_tag_prefs = randint(1, len(tags))

        discussion_prefs = sample(discussions, num_discussion_prefs)
        tag_prefs = sample(tags, num_tag_prefs)


        for discussion in discussion_prefs:
            
            discussion_tag_relation = Discussion.tags.append(tags)

        db.session.add(discussion_tag_relation)
        db.session.commit()

        print("Seeding completed\n")





