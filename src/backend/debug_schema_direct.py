#!/usr/bin/env python3
"""
Script de debug para probar el schema directamente en el contexto de Flask.
"""

import json
import sys
import os

# Agregar el directorio del proyecto al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.config import TestingConfig
from app.schemas.project_schema import ProjectInputSchema

def debug_schema_direct():
    """Debug del schema directamente en contexto Flask"""
    print("=== DEBUG SCHEMA DIRECT ===")
    
    app = create_app(TestingConfig)
    
    with app.app_context():
        print("Contexto de aplicación creado")
        
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
            print(f"✓ Validación exitosa: {result}")
        except Exception as e:
            print(f"✗ Error en validación: {e}")
            print(f"Tipo de error: {type(e)}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    debug_schema_direct()
