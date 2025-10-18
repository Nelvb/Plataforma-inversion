# -*- coding: utf-8 -*-
"""
project_schema.py — Schemas Marshmallow para el modelo flexible de proyectos.

Contexto:
Define validaciones mínimas y serialización completa para el nuevo modelo "Project".
Los campos JSON (investment_data, content_sections, gallery) se validan como estructuras
genéricas, permitiendo máxima flexibilidad y compatibilidad con cualquier tipo de proyecto.

Notas de mantenimiento:
- Evita validaciones rígidas sobre estructuras internas JSON.
- Compatible con cualquier frontend que interprete bloques dinámicos.
- Se debe validar el contenido interno (bloques) desde el frontend o servicios dedicados.
- Diseñado para escalar a un CMS modular (admin visual futuro).

@author Boost A Project Team
@since v2.0.0
"""

from marshmallow import Schema, fields, validate


class ProjectInputSchema(Schema):
    """Schema de entrada para crear o actualizar proyectos flexibles."""
    slug = fields.Str(required=True, validate=validate.Length(min=3, max=150))
    title = fields.Str(required=True, validate=validate.Length(min=3, max=200))
    subtitle = fields.Str(allow_none=True)
    description = fields.Str(allow_none=True)
    status = fields.Str(validate=validate.OneOf(["open", "active", "funded", "closed"]))

    # Campos multimedia y estructurados
    main_image_url = fields.Str(allow_none=True)
    gallery = fields.List(fields.Dict(), allow_none=True)

    # Datos financieros y contenido flexible
    investment_data = fields.Dict(allow_none=True)
    content_sections = fields.List(fields.Dict(), allow_none=True)

    # Campos automáticos
    views = fields.Int(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class ProjectSchema(ProjectInputSchema):
    """Schema completo de salida (lectura) para el frontend."""
    id = fields.Int(dump_only=True)
