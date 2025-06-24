from app import create_app, db
from app.models import Program, User
from datetime import datetime

app = create_app()

with app.app_context():
    # Clear existing data
    Program.query.delete()
    User.query.delete()

    # Sample programs
    p1 = Program(title="Computer Science", description="Learn programming, algorithms, and systems.")
    p2 = Program(title="Business Administration", description="Master business skills and management.")
    p3 = Program(title="Graphic Design", description="Design principles, tools, and portfolios.")
    db.session.add_all([p1, p2, p3])
    
    # Sample users
    u1 = User(full_name="Ali Mwangi", email="ali@example.com", created_at=datetime.utcnow())
    u2 = User(full_name="Zara Ochieng", email="zara@example.com", created_at=datetime.utcnow())
    db.session.add_all([u1, u2])

    db.session.commit()

    print("🌱 Seeded database successfully!")
