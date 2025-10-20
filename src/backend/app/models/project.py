# -*- coding: utf-8 -*-
"""
project.py — Modelo flexible para proyectos de inversión (agnóstico al tipo de activo).

Contexto:
Reemplaza la antigua estructura rígida basada en campos inmobiliarios.
Permite describir cualquier tipo de proyecto (coliving, restaurante, pádel, energía, etc.)
mediante bloques dinámicos y datos financieros genéricos en formato JSON.

Notas de mantenimiento:
- Totalmente compatible con la arquitectura existente de Flask y Marshmallow.
- No requiere migraciones adicionales al añadir nuevos tipos de bloques.
- Los campos "investment_data" y "content_sections" almacenan la estructura completa del proyecto.
- La galería principal se gestiona como lista JSON de imágenes Cloudinary (src, alt).
- Campos category, featured y priority permiten organización y destacado de proyectos.

@author Boost A Project Team
@since v2.0.0
"""

from datetime import datetime, timezone
from app.extensions import db


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)

    # Identidad básica
    slug = db.Column(db.String(150), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    subtitle = db.Column(db.String(300))
    description = db.Column(db.Text)  # resumen corto
    status = db.Column(db.String(20), default="open")  # open, active, funded, closed
    
    # Organización y destacado
    category = db.Column(db.String(50))  # inmobiliario, hosteleria, deportivo, energia, etc.
    featured = db.Column(db.Boolean, default=False)  # si se destaca en homepage
    priority = db.Column(db.Integer, default=0)  # orden de visualización (mayor = más arriba)
    free_sections_count = db.Column(db.Integer, default=5, nullable=True)  # Número de secciones visibles sin registro (sistema FREEMIUM)

    # Imágenes
    main_image_url = db.Column(db.String(500))
    gallery = db.Column(db.JSON)  # [{"src": "...", "alt": "..."}]

    # Datos financieros genéricos
    investment_data = db.Column(db.JSON)  # total, min_investment, breakdown, escenarios, etc.

    # Contenido libre estructurado
    content_sections = db.Column(db.JSON)  # lista ordenada de bloques flexibles

    # Métricas y timestamps
    views = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Project {self.slug}>"