from flask import Blueprint, request, jsonify
from .models import db, Program, User, Message, Application

api = Blueprint('api', __name__)

# GET all programs
@api.route('/programs', methods=['GET'])
def get_programs():
    programs = Program.query.all()
    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "description": p.description
        } for p in programs
    ]), 200

# POST /applications — user applies to a program
@api.route('/applications', methods=['POST', 'OPTIONS'])
def submit_application():
    if request.method == 'OPTIONS':
        return jsonify({'ok': True}), 200

    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    program_id = data.get('program_id')

    if not (full_name and email and program_id):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(full_name=full_name, email=email)
        db.session.add(user)
        db.session.commit()

    program = Program.query.get(program_id)
    if not program:
        return jsonify({"error": "Program not found"}), 404

    application = Application(user_id=user.id, program_id=program.id)
    db.session.add(application)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully"}), 201


# POST /messages — send a contact form message
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

# GET /users/:email — fetch user ID by email
@api.route('/users/<email>', methods=['GET'])
def get_user_by_email(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"id": user.id}), 200

# GET /applications/:user_id — get applications for a user
@api.route('/applications/<int:user_id>', methods=['GET'])
def get_user_applications(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    apps = []
    for app in user.applications:
        if not app.program:
            continue
        apps.append({
            "program_title": app.program.title,
            "status": app.status,
            "applied_on": app.created_at.strftime('%Y-%m-%d') if app.created_at else "Unknown"
        })

    return jsonify(apps), 200

# GET /admin/dashboard — admin summary
@api.route('/admin/dashboard', methods=['GET'])
def admin_dashboard():
    program_count = Program.query.count()
    user_count = User.query.count()
    application_count = Application.query.count()
    return jsonify({
        "total_programs": program_count,
        "total_users": user_count,
        "total_applications": application_count
    }), 200
