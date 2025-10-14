#!/usr/bin/env python3
"""
Script de debug con contexto completo de Flask.
"""

import json
import sys
import os

# Agregar el directorio del proyecto al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.config import TestingConfig
from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token

def debug_full_context():
    """Debug con contexto completo de Flask"""
    print("=== DEBUG FULL CONTEXT ===")
    
    app = create_app(TestingConfig)
    
    with app.app_context():
        print("Contexto de aplicación creado")
        
        # Crear tablas
        db.create_all()
        print("Tablas creadas")
        
        # Crear usuario admin
        admin = User(username='admin_test', email='admin@test.com', is_admin=True)
        admin.set_password('admin123')
        db.session.add(admin)
        db.session.commit()
        print("Usuario admin creado")
        
        # Crear token
        token = create_access_token(identity=admin.id)
        print(f"Token creado: {token[:50]}...")
        
        # Test data
        data = {
            'title': 'FiveRooms Venezuela',
            'description': 'Proyecto de alquiler por habitaciones',
            'investment_goal': 110000,
            'location': 'Valladolid',
            'expected_return': '12'
        }
        
        print(f"Datos de test: {data}")
        
        # Test con cliente
        with app.test_client() as client:
            print("Cliente de test creado")
            
            # Test GET primero
            get_res = client.get('/api/projects')
            print(f"GET Status: {get_res.status_code}")
            
            # Test POST
            res = client.post(
                '/api/projects',
                headers={'Authorization': f'Bearer {token}'},
                data=json.dumps(data),
                content_type='application/json'
            )
            
            print(f"POST Status: {res.status_code}")
            print(f"Response Headers: {dict(res.headers)}")
            
            try:
                response_data = res.get_json()
                print(f"Response JSON: {response_data}")
            except Exception as e:
                print(f"Error parsing JSON: {e}")
                print(f"Raw response: {res.get_data(as_text=True)}")

if __name__ == "__main__":
    debug_full_context()
