# -*- coding: utf-8 -*-
"""
project.py — Modelo SQLAlchemy para proyectos de inversión inmobiliaria.

Contexto:
Define la estructura de la tabla `projects` utilizada por el sistema Boost A Project.
Cada proyecto representa una oportunidad de inversión gestionada por administradores
desde el panel y mostrada en el frontend público.

Notas de mantenimiento:
- Campo `estimated_term` renombrado a `estimated_duration` para coherencia semántica.
- Todos los nombres de columnas ahora coinciden con el schema y el frontend.
- No alterar las longitudes o tipos de columnas sin generar una migración Alembic.
- Mantiene timestamps automáticos (created_at, updated_at).

@author Boost A Project Team
@since v1.0.0
"""

from datetime import datetime, timezone
from app.extensions import db


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    investment_goal = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    investment_type = db.Column(db.String(100))
    surface_m2 = db.Column(db.Integer)
    rooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    min_investment = db.Column(db.Float)
    expected_return = db.Column(db.String(10))
    optimistic_return = db.Column(db.String(10))
    estimated_duration = db.Column(db.String(50))  # ← nombre final y profesional
    status = db.Column(db.String(50), default="Abierto")
    financial_structure = db.Column(db.JSON)
    risk_mitigations = db.Column(db.JSON)
    gallery = db.Column(db.JSON)

    # Campos adicionales para formulario avanzado
    financial_structure_text = db.Column(db.Text)
    rentability_projection = db.Column(db.Text)
    risk_analysis = db.Column(db.Text)
    team_description = db.Column(db.Text)
    external_link = db.Column(db.String(255))

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Project {self.title}>"
