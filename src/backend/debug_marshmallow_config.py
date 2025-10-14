#!/usr/bin/env python3
"""
Script de debug para verificar la configuración de Marshmallow.
"""

import json
import sys
import os

# Agregar el directorio del proyecto al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.config import TestingConfig
from app.models.user import User
from app.extensions import db, ma
from flask_jwt_extended import create_access_token
from app.schemas.project_schema import ProjectInputSchema

def debug_marshmallow_config():
    """Debug de la configuración de Marshmallow"""
    print("=== DEBUG MARSHMALLOW CONFIG ===")
    
    app = create_app(TestingConfig)
    
    with app.app_context():
        print("Contexto de aplicación creado")
        
        # Verificar configuración de Marshmallow
        print(f"MA config: {app.config.get('MARSHMALLOW_')}")
        
        # Crear tablas
        db.create_all()
        
        # Crear usuario admin
        admin = User(username='admin_test', email='admin@test.com', is_admin=True)
        admin.set_password('admin123')
        db.session.add(admin)
        db.session.commit()
        
        # Crear token
        token = create_access_token(identity=admin.id)
        
        # Test data
        data = {
            'title': 'FiveRooms Venezuela',
            'description': 'Proyecto de alquiler por habitaciones',
            'investment_goal': 110000,
            'location': 'Valladolid',
            'expected_return': '12'
        }
        
        print(f"Datos de test: {data}")
        
        # Probar schema directamente
        schema = ProjectInputSchema()
        try:
            validated_data = schema.load(data)
            print(f"✓ Schema validation exitosa: {validated_data}")
        except Exception as e:
            print(f"✗ Schema validation falló: {e}")
            return
        
        # Test con cliente
        with app.test_client() as client:
            try:
                res = client.post(
                    '/api/projects',
                    headers={'Authorization': f'Bearer {token}'},
                    data=json.dumps(data),
                    content_type='application/json'
                )
                
                print(f"Status: {res.status_code}")
                response_data = res.get_json()
                print(f"Response: {response_data}")
                
            except Exception as e:
                print(f"Exception capturada: {e}")
                import traceback
                traceback.print_exc()

if __name__ == "__main__":
    debug_marshmallow_config()
