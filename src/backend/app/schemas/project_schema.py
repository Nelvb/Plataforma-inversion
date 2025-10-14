# -*- coding: utf-8 -*-
"""
project_schema.py — Schemas de validación y serialización para proyectos.

Contexto:
Define los esquemas Marshmallow usados para validar los datos de entrada (creación/edición)
y para serializar los objetos Project hacia el frontend.

Notas de mantenimiento:
- Se corrigió el campo `estimated_term` → `estimated_duration` para coincidir con el modelo real.
- Eliminadas duplicaciones innecesarias de campos avanzados.
- Se mantiene compatibilidad total con el frontend y la API actual.
- Los campos avanzados (financial_structure_text, rentability_projection, etc.)
  se incluyen tanto en entrada como en salida.

@author Boost A Project Team
@since v1.0.0
"""

from marshmallow import Schema, fields, validate


class ProjectInputSchema(Schema):
    """
    Schema para validación de datos de entrada (crear/actualizar proyectos).
    Solo valida campos esenciales y permite omitir opcionales.
    """
    title = fields.Str(required=True, validate=validate.Length(min=3, max=120))
    description = fields.Str(required=True)
    image_url = fields.Str(allow_none=True)
    investment_goal = fields.Float(required=True)
    location = fields.Str(required=True)
    expected_return = fields.Str(required=True)

    # Campos opcionales
    investment_type = fields.Str(allow_none=True)
    surface_m2 = fields.Int(allow_none=True)
    rooms = fields.Int(allow_none=True)
    bathrooms = fields.Int(allow_none=True)
    min_investment = fields.Float(allow_none=True)
    optimistic_return = fields.Str(allow_none=True)
    estimated_duration = fields.Str(allow_none=True)  # corregido
    status = fields.Str(allow_none=True)
    financial_structure = fields.List(fields.Dict(), allow_none=True)
    risk_mitigations = fields.List(fields.Str(), allow_none=True)
    gallery = fields.List(fields.Str(), allow_none=True)

    # Campos adicionales para formulario avanzado
    financial_structure_text = fields.Str(allow_none=True)
    rentability_projection = fields.Str(allow_none=True)
    risk_analysis = fields.Str(allow_none=True)
    team_description = fields.Str(allow_none=True)
    external_link = fields.Str(allow_none=True)


class ProjectSchema(Schema):
    """
    Schema completo para serialización de proyectos.
    Incluye campos calculados, avanzados y de solo lectura.
    """
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=3, max=120))
    slug = fields.Str(dump_only=True)
    description = fields.Str(required=True)
    image_url = fields.Str(allow_none=True)
    investment_goal = fields.Float(required=True)
    location = fields.Str(required=True)
    investment_type = fields.Str(allow_none=True)
    surface_m2 = fields.Int(allow_none=True)
    rooms = fields.Int(allow_none=True)
    bathrooms = fields.Int(allow_none=True)
    min_investment = fields.Float(allow_none=True)
    expected_return = fields.Str(required=True)
    optimistic_return = fields.Str(allow_none=True)
    estimated_duration = fields.Str(allow_none=True)  # corregido
    status = fields.Str(allow_none=True)
    financial_structure = fields.List(fields.Dict(), allow_none=True)
    risk_mitigations = fields.List(fields.Str(), allow_none=True)
    gallery = fields.List(fields.Str(), allow_none=True)

    # Campos adicionales para formulario avanzado
    financial_structure_text = fields.Str(allow_none=True)
    rentability_projection = fields.Str(allow_none=True)
    risk_analysis = fields.Str(allow_none=True)
    team_description = fields.Str(allow_none=True)
    external_link = fields.Str(allow_none=True)

    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
