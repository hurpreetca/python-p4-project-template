#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from config import db, app  
from models import User, Discussion, Comment, Tag

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting all data")
        
        User.query.delete()
        Discussion.query.delete()
        Comment.query.delete()
        Tag.query.delete()

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
        discussions = [
            Discussion(discussion_topic="The Art of Cooking: Culinary Tips and Techniques"),
            Discussion(discussion_topic="Literature and Its Influence on Society"),
            Discussion(discussion_topic="Mental Health Stigma: Breaking the Silence"),
            Discussion(discussion_topic="Exploring World History: Ancient Civilizations"),
            Discussion(discussion_topic="The Future of Renewable Energy Sources"),
            Discussion(discussion_topic="Entrepreneurship in the Digital Age"),
            Discussion(discussion_topic="Music Across Cultures: A Universal Language"),
            Discussion(discussion_topic="The Impact of Urbanization on Wildlife"),
            Discussion(discussion_topic="Human Rights and Social Justice Movements"),
            Discussion(discussion_topic="The Beauty of Underwater Ecosystems"),
            Discussion(discussion_topic="Mindfulness and Meditation for Stress Relief"),
            Discussion(discussion_topic="The World of Competitive Gaming (Esports)"),
            Discussion(discussion_topic="Sustainable Fashion: Style with a Purpose"),
            Discussion(discussion_topic="Exploring the Marvels of Astronomy"),
            Discussion(discussion_topic="Traditional Medicine vs. Modern Healthcare"),
            Discussion(discussion_topic="The Evolution of Dance Styles"),
            Discussion(discussion_topic="Cuisine from Around the Globe"),
            Discussion(discussion_topic="Environmental Conservation Efforts Worldwide"),
            Discussion(discussion_topic="The Art of Public Speaking and Communication"),
            Discussion(discussion_topic="Innovations in Artificial Intelligence and Robotics"),
        ]
        db.session.add_all(discussions)
        db.session.commit()

        print("...Creating Comments...")
        comments = [
            Comment(comment_text="AI and robotics are transforming industries. What do you think is the most exciting AI application right now?"),
            Comment(comment_text="As a computer science student, I'm always eager to learn about the latest advancements in AI. Any recent breakthroughs that caught your eye?"),
            Comment(comment_text="I've been trying to switch to sustainable fashion brands. Any recommendations for eco-friendly clothing companies?"),
            Comment(comment_text="Fast fashion is such a problem. We need more discussions like this to promote conscious consumer choices!"),
            Comment(comment_text="Ancient Egypt has always fascinated me. The architecture, mythology, and the mysteries of the pyramids are mind-blowing!"),
            Comment(comment_text="I'm a history buff, and I love reading about lesser-known ancient civilizations. Do you have any favorite historical books or documentaries?"),
            Comment(comment_text="It's crucial that we continue to raise awareness about mental health and provide support. Let's end the stigma!"),
            Comment(comment_text="I've struggled with anxiety for years, and it's reassuring to see more open conversations about mental health. Thanks for sharing."),
            Comment(comment_text="I've been experimenting with different cuisines lately. Any favorite tips or recipes you'd recommend for a newbie chef?"),
            Comment(comment_text="Cooking is such a creative outlet for me. I love trying new ingredients and techniques. What's your signature dish?"),
        ]
        db.session.add_all(comments)
        db.session.commit()

        print("...Creating Tags...")
        tags = [
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
        db.session.add_all(tags)
        db.session.commit()

        print("Seeding completed\n")





