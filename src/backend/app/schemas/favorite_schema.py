# -*- coding: utf-8 -*-
"""
favorite_schema.py — Schemas Marshmallow para favoritos.

Contexto:
Define la serialización y validación de favoritos.
FavoriteSchema incluye información completa del proyecto asociado.
FavoriteInputSchema valida la entrada al crear/eliminar favoritos.

Notas de mantenimiento:
- Utiliza Nested para incluir ProjectSchema completo.
- Compatible con endpoints REST en favorites.py.
- Validación automática de project_id existente.

@author Boost A Project Team
@since v2.1.0
"""

from marshmallow import Schema, fields, validate


class FavoriteInputSchema(Schema):
    """Schema para validar entrada al añadir favorito."""
    project_id = fields.Integer(required=True, validate=validate.Range(min=1))


class FavoriteSchema(Schema):
    """Schema completo de favorito con información del proyecto."""
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(dump_only=True)
    project_id = fields.Integer()
    created_at = fields.DateTime(dump_only=True)
    
    # Incluir datos completos del proyecto
    project = fields.Nested("ProjectSchema", only=(
        "id", "slug", "title", "subtitle", "description", 
        "main_image_url", "status", "investment_data"
    ))