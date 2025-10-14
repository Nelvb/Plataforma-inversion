#!/usr/bin/env python3
"""
Script de debug para capturar el error exacto.
"""

import json
import sys
import os
import traceback

# Agregar el directorio del proyecto al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.config import TestingConfig
from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token

def debug_error_capture():
    """Debug para capturar el error exacto"""
    print("=== DEBUG ERROR CAPTURE ===")
    
    app = create_app(TestingConfig)
    
    with app.app_context():
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
                print(f"Traceback: {traceback.format_exc()}")

if __name__ == "__main__":
    debug_error_capture()
