from app import create_app, db
from app.models import Program, User, Message
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
        Program(title="Computer Science", description="Learn algorithms, web dev, and AI."),
        Program(title="Business Administration", description="Master management and entrepreneurship."),
        Program(title="Graphic Design", description="Explore visual storytelling and design tools.")
    ]
    db.session.add_all(programs)
    db.session.commit()

    # Add users
    user1 = User(full_name="Alice Wanjiku", email="alice@example.com")
    user2 = User(full_name="Brian Otieno", email="brian@example.com")
    db.session.add_all([user1, user2])
    db.session.commit()

    # Create applications (many-to-many)
    user1.programs.append(programs[0])  # Alice applies for CS
    user2.programs.append(programs[1])  # Brian applies for Business
    db.session.commit()

    # Add messages
    message1 = Message(subject="Application Inquiry", content="When is the deadline?", user_id=user1.id)
    message2 = Message(subject="Program Info", content="Do you offer online courses?", user_id=user2.id)
    db.session.add_all([message1, message2])
    db.session.commit()

    print("✅ Seeded programs, users, applications, and messages.")
