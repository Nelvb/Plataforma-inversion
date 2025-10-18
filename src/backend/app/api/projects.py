# -*- coding: utf-8 -*-
"""
projects.py — API REST para gestión de proyectos flexibles.

Contexto:
Expone endpoints CRUD simples y seguros para el nuevo modelo Project.
Los proyectos se almacenan como estructuras JSON flexibles, permitiendo
distintos tipos de activos (coliving, pádel, restaurantes, etc.) sin
necesidad de alterar el modelo o el schema.

Notas de mantenimiento:
- Incluye validaciones básicas con Marshmallow.
- Admite expansión futura con autenticación admin y filtrado avanzado.
- Compatible con el frontend Next.js mediante projectService.ts.
- Devuelve errores HTTP claros y consistentes (400, 404, 500).

@author Boost A Project Team
@since v2.0.0
"""

from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.project import Project
from app.schemas.project_schema import ProjectSchema, ProjectInputSchema

projects_bp = Blueprint("projects_bp", __name__, url_prefix="/api/projects")

# Schemas
project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)
input_schema = ProjectInputSchema()


@projects_bp.route("/", methods=["GET"])
def get_projects():
    """Devuelve la lista completa de proyectos."""
    projects = Project.query.all()
    return jsonify(projects_schema.dump(projects)), 200


@projects_bp.route("/<slug>", methods=["GET"])
def get_project(slug):
    """Devuelve el detalle de un proyecto por su slug."""
    project = Project.query.filter_by(slug=slug).first()
    if not project:
        return jsonify({"error": "Proyecto no encontrado"}), 404
    return jsonify(project_schema.dump(project)), 200


@projects_bp.route("/", methods=["POST"])
def create_project():
    """Crea un nuevo proyecto flexible."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos no proporcionados"}), 400

    errors = input_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    # Evitar slugs duplicados
    if Project.query.filter_by(slug=data.get("slug")).first():
        return jsonify({"error": "Slug ya existente"}), 400

    project = Project(**data)
    db.session.add(project)
    db.session.commit()
    return jsonify(project_schema.dump(project)), 201


@projects_bp.route("/<slug>", methods=["PUT"])
def update_project(slug):
    """Actualiza un proyecto existente."""
    project = Project.query.filter_by(slug=slug).first()
    if not project:
        return jsonify({"error": "Proyecto no encontrado"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos no proporcionados"}), 400

    errors = input_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400

    for key, value in data.items():
        setattr(project, key, value)

    db.session.commit()
    return jsonify(project_schema.dump(project)), 200


@projects_bp.route("/<slug>", methods=["DELETE"])
def delete_project(slug):
    """Elimina un proyecto por slug."""
    project = Project.query.filter_by(slug=slug).first()
    if not project:
        return jsonify({"error": "Proyecto no encontrado"}), 404

    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Proyecto eliminado correctamente"}), 200
