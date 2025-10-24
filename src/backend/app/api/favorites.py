# -*- coding: utf-8 -*-
"""
favorites.py — API REST para gestión de favoritos de usuarios.

Contexto:
Expone endpoints para que usuarios autenticados gestionen sus proyectos favoritos.
Incluye listado, añadir y eliminar favoritos con validación de autenticación JWT.
Los favoritos se sincronizan con el frontend (Zustand store).

Notas de mantenimiento:
- Todos los endpoints requieren autenticación JWT (@jwt_required()).
- Previene duplicados mediante constraint único en BD.
- Devuelve proyectos completos usando ProjectSchema nested.
- Compatible con optimistic updates del frontend.

@author Boost A Project Team
@since v2.1.0
"""

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.favorite import Favorite
from app.models.project import Project
from app.schemas.favorite_schema import FavoriteSchema, FavoriteInputSchema
from sqlalchemy.exc import IntegrityError

favorites_bp = Blueprint("favorites_bp", __name__, url_prefix="/api/favorites")

# Schemas
favorite_schema = FavoriteSchema()
favorites_schema = FavoriteSchema(many=True)
input_schema = FavoriteInputSchema()


@favorites_bp.route("/", methods=["GET"])
@jwt_required()
def get_favorites():
    """
    Devuelve todos los favoritos del usuario autenticado.
    Incluye información completa de cada proyecto.
    """
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify(favorites_schema.dump(favorites)), 200


@favorites_bp.route("/", methods=["POST"])
@jwt_required()
def add_favorite():
    """
    Añade un proyecto a favoritos del usuario autenticado.
    Body: { "project_id": number }
    """
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Datos no proporcionados"}), 400

    # Validar entrada
    errors = input_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    project_id = data.get("project_id")

    # Verificar que el proyecto existe
    project = db.session.get(Project, project_id)
    if not project:
        return jsonify({"error": "Proyecto no encontrado"}), 404

    # Verificar si ya existe el favorito
    existing = Favorite.query.filter_by(
        user_id=user_id, 
        project_id=project_id
    ).first()
    
    if existing:
        return jsonify({"error": "El proyecto ya está en favoritos"}), 409

    # Crear favorito
    try:
        favorite = Favorite(user_id=user_id, project_id=project_id)
        db.session.add(favorite)
        db.session.commit()
        return jsonify(favorite_schema.dump(favorite)), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Error al crear favorito"}), 500


@favorites_bp.route("/<int:project_id>", methods=["DELETE"])
@jwt_required()
def remove_favorite(project_id):
    """
    Elimina un proyecto de los favoritos del usuario autenticado.
    """
    user_id = get_jwt_identity()
    
    favorite = Favorite.query.filter_by(
        user_id=user_id, 
        project_id=project_id
    ).first()
    
    if not favorite:
        return jsonify({"error": "Favorito no encontrado"}), 404

    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorito eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar favorito"}), 500