#!/usr/bin/env python3
"""
Script de debug para verificar la importación del schema.
"""

import json
import sys
import os

# Agregar el directorio del proyecto al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def debug_schema_import():
    """Debug de la importación del schema"""
    print("=== DEBUG SCHEMA IMPORT ===")
    
    try:
        from app.schemas.project_schema import ProjectInputSchema
        print("✓ ProjectInputSchema importado correctamente")
        
        schema = ProjectInputSchema()
        print(f"✓ Schema creado: {schema}")
        
        # Test data
        data = {
            'title': 'FiveRooms Venezuela',
            'description': 'Proyecto de alquiler por habitaciones',
            'investment_goal': 110000,
            'location': 'Valladolid',
            'expected_return': '12'
        }
        
        result = schema.load(data)
        print(f"✓ Validación exitosa: {result}")
        
    except Exception as e:
        print(f"✗ Error en importación: {e}")
        import traceback
        traceback.print_exc()
    
    try:
        from app.api.projects import projects_bp
        print("✓ projects_bp importado correctamente")
        
        from app.models.project import Project
        print("✓ Project model importado correctamente")
        
    except Exception as e:
        print(f"✗ Error en imports de API: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_schema_import()
