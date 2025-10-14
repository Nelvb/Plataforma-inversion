from flask import Blueprint, request, jsonify
from app.models.project import Project
from app.schemas.project_schema import ProjectSchema, ProjectInputSchema
from app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
import logging

projects_bp = Blueprint("projects_bp", __name__)
project_schema = ProjectSchema()
project_input_schema = ProjectInputSchema()
projects_schema = ProjectSchema(many=True)
logger = logging.getLogger(__name__)

@projects_bp.route("/api/projects", methods=["GET"])
def get_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify(projects_schema.dump(projects)), 200

@projects_bp.route("/api/projects/<string:slug>", methods=["GET"])
def get_project(slug):
    project = Project.query.filter_by(slug=slug).first()
    if not project:
        return jsonify({"error": "Project not found"}), 404
    return jsonify(project_schema.dump(project)), 200

@projects_bp.route("/api/projects", methods=["POST"])
@jwt_required()
def create_project():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    # Validar datos con el schema
    try:
        validated_data = project_input_schema.load(data)
    except Exception as e:
        logger.error(f"Validation error: {str(e)}")
        return jsonify({"error": f"Validation error: {str(e)}"}), 422

    title = validated_data.get("title")
    slug = title.lower().replace(" ", "-")

    # Check if project with same slug already exists
    existing_project = Project.query.filter_by(slug=slug).first()
    if existing_project:
        return jsonify({"error": f"A project with title '{title}' already exists"}), 400

    project = Project(
        title=title,
        slug=slug,
        description=validated_data.get("description"),
        image_url=validated_data.get("image_url"),
        investment_goal=validated_data.get("investment_goal"),
        location=validated_data.get("location"),
        investment_type=validated_data.get("investment_type"),
        surface_m2=validated_data.get("surface_m2"),
        rooms=validated_data.get("rooms"),
        bathrooms=validated_data.get("bathrooms"),
        min_investment=validated_data.get("min_investment"),
        expected_return=validated_data.get("expected_return"),
        optimistic_return=validated_data.get("optimistic_return"),
        estimated_duration=validated_data.get("estimated_duration"),
        status=validated_data.get("status", "Abierto"),
        financial_structure=validated_data.get("financial_structure"),
        risk_mitigations=validated_data.get("risk_mitigations"),
        gallery=validated_data.get("gallery")
    )

    db.session.add(project)
    db.session.commit()
    logger.info(f"Created project: {title}")
    return jsonify(project_schema.dump(project)), 201

@projects_bp.route("/api/projects/<string:slug>", methods=["PUT"])
@jwt_required()
def update_project(slug):
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    project = Project.query.filter_by(slug=slug).first()
    if not project:
        return jsonify({"error": "Project not found"}), 404

    data = request.get_json()
    for key, value in data.items():
        if hasattr(project, key):
            setattr(project, key, value)
    db.session.commit()
    logger.info(f"Updated project: {slug}")
    return jsonify(project_schema.dump(project)), 200

@projects_bp.route("/api/projects/<string:slug>", methods=["DELETE"])
@jwt_required()
def delete_project(slug):
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    project = Project.query.filter_by(slug=slug).first()
    if not project:
        return jsonify({"error": "Project not found"}), 404

    db.session.delete(project)
    db.session.commit()
    logger.warning(f"Deleted project: {slug}")
    return jsonify({"message": "Project deleted"}), 200
