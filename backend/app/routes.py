from  flask import Blueprint, request, jsonify
from .models import db, Program, User, Message
from datetime import datetime


api=Blueprint ('api', __name__)

@api.route('/programs', methods=['GET'])
def get_programs():
    programs=Program.query.all()
    return jsonify([{
        "id":p.id,
        "title": p.title,
        "description": p.description
    } for p in programs]), 200

@api.route('/applications', methods=['POST'])
def submit_application():
    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    program_id = data.get('program_id')

    # check if user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(full_name=full_name, email=email)
        db.session.add(user)
        db.session.commit()

    # add program application
    program = Program.query.get(program_id)
    if not program:
        return jsonify({"error": "Program not found"}), 404

    user.programs.append(program)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully"}), 201


# POST /messages — contact form messages
@api.route('/messages', methods=['POST'])
def send_message():
    data = request.get_json()
    subject = data.get('subject')
    content = data.get('content')
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    message = Message(subject=subject, content=content, user_id=user.id)
    db.session.add(message)
    db.session.commit()

    return jsonify({"message": "Message received"}), 201


# GET /applications/<user_id> — check application status
@api.route('/applications/<int:user_id>', methods=['GET'])
def get_user_applications(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    apps = [{
        "program_title": p.title,
        "status": "submitted"  # Optional status if needed
    } for p in user.programs]

    return jsonify(apps), 200

