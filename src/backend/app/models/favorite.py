# -*- coding: utf-8 -*-
"""
favorite.py — Modelo para favoritos de usuarios.

Contexto:
Tabla intermedia que relaciona users con projects (muchos-a-muchos).
Permite a usuarios registrados guardar proyectos para acceso rápido.
Incluye timestamp de creación para futuras funcionalidades (ej: ordenar por fecha).

Notas de mantenimiento:
- Constraint único (user_id, project_id) previene duplicados.
- Backref en User y Project para acceso bidireccional.
- Compatible con sincronización frontend (Zustand) y backend (Flask).

@author Boost A Project Team
@since v2.1.0
"""

from datetime import datetime, timezone
from app.extensions import db


class Favorite(db.Model):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    created_at = db.Column(
        db.DateTime, 
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    # Relaciones
    user = db.relationship("User", backref="favorites")
    project = db.relationship("Project", backref="favorited_by")

    # Constraint único: un usuario no puede guardar el mismo proyecto dos veces
    __table_args__ = (
        db.UniqueConstraint("user_id", "project_id", name="uq_user_project"),
    )

    def __repr__(self):
        return f"<Favorite user_id={self.user_id} project_id={self.project_id}>"