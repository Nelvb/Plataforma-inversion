#!/usr/bin/env python3
"""
Script de debug específico para el schema de proyectos.
"""

import json
import sys
import os

# Agregar el directorio del proyecto al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.config import TestingConfig
from app.schemas.project_schema import ProjectInputSchema

def debug_schema_validation():
    """Debug específico del schema de proyectos"""
    print("=== DEBUG SCHEMA VALIDATION ===")
    
    # Crear schema
    schema = ProjectInputSchema()
    print(f"Schema creado: {schema}")
    
    # Test data
    data = {
        'title': 'FiveRooms Venezuela',
        'description': 'Proyecto de alquiler por habitaciones',
        'investment_goal': 110000,
        'location': 'Valladolid',
        'expected_return': '12'
    }
    
    print(f"Datos de test: {data}")
    
    try:
        # Validar datos
        result = schema.load(data)
        print(f"Validación exitosa: {result}")
    except Exception as e:
        print(f"Error en validación: {e}")
        print(f"Tipo de error: {type(e)}")
        
        # Intentar con datos más simples
        simple_data = {'title': 'Test'}
        try:
            simple_result = schema.load(simple_data)
            print(f"Validación simple exitosa: {simple_result}")
        except Exception as e2:
            print(f"Error en validación simple: {e2}")

if __name__ == "__main__":
    debug_schema_validation()
