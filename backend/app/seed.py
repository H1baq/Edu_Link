from app import create_app, db
from app.models import Program, User, Message, Application
from flask import Flask
from sqlalchemy import text
from datetime import datetime

app = create_app()

with app.app_context():
    # Clear existing data
    Message.query.delete()
    db.session.execute(text('DELETE FROM applications'))
    User.query.delete()
    Program.query.delete()

    # Add programs
    programs = [
        Program(title="Computer Science", description="Learn algorithms, web development, and AI."),
        Program(title="Business Administration", description="Master management and entrepreneurship."),
        Program(title="Graphic Design", description="Explore visual storytelling and design tools."),
        Program(title="Full-Stack Web Development", description="Master frontend and backend technologies including React, Node.js, and databases."),
        Program(title="UI/UX Design", description="Design intuitive user interfaces and seamless user experiences."),
        Program(title="Data Analytics", description="Analyze datasets using Python, Excel, and visualization tools."),
        Program(title="Cybersecurity Fundamentals", description="Protect systems and networks from digital threats."),
        Program(title="Digital Marketing", description="Learn SEO, content strategy, and social media advertising."),
        Program(title="Cloud Computing", description="Get hands-on with AWS, Azure, and DevOps practices."),
        Program(title="Mobile App Development", description="Build Android and iOS apps using Flutter and React Native."),
    ]
    db.session.add_all(programs)
    db.session.commit()

    # Add users
    user1 = User(full_name="Alice Wanjiku", email="alice@example.com")
    user2 = User(full_name="Brian Otieno", email="brian@example.com")
    db.session.add_all([user1, user2])
    db.session.commit()

    # Create applications using Application model
    app1 = Application(user_id=user1.id, program_id=programs[0].id)
    app2 = Application(user_id=user2.id, program_id=programs[1].id)
    db.session.add_all([app1, app2])
    db.session.commit()

    # Add messages
    message1 = Message(content="When is the deadline?", user_id=user1.id)
    message2 = Message(content="Do you offer online courses?", user_id=user2.id)

    db.session.add_all([message1, message2])
    db.session.commit()

    print("✅ Seeded programs, users, applications, and messages.")
