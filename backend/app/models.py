from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Table, Column, Integer, String, Text, ForeignKey, DateTime

db = SQLAlchemy()

# Association table for many-to-many between Users and Programs
applications = Table(
    'applications',
    db.metadata,  # ✅ Required in SQLAlchemy 3.x
    Column('id', Integer, primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id'), nullable=False),
    Column('program_id', Integer, ForeignKey('programs.id'), nullable=False),
    Column('status', String(50), nullable=False, default='pending'),
    Column('submitted_at', DateTime, default=datetime.utcnow)
)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    messages = db.relationship('Message', backref='user', lazy=True)
    programs = db.relationship('Program', secondary=applications, backref='applicants')


class Program(db.Model):  # ✅ Fix: db.Model not db.Models
    __tablename__ = 'programs'  # ✅ Fix: correct keyword is __tablename__

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(120))
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
