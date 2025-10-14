#!/usr/bin/env python3
"""
Script de debug para capturar la excepción exacta.
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

def debug_exception_detail():
    """Debug para capturar la excepción exacta"""
    print("=== DEBUG EXCEPTION DETAIL ===")
    
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
                
                # Si es 422, vamos a ver qué está pasando en el endpoint
                if res.status_code == 422:
                    print("=== INVESTIGANDO ERROR 422 ===")
                    
                    # Vamos a probar con datos más simples
                    simple_data = {'title': 'Test'}
                    simple_res = client.post(
                        '/api/projects',
                        headers={'Authorization': f'Bearer {token}'},
                        data=json.dumps(simple_data),
                        content_type='application/json'
                    )
                    print(f"Simple test status: {simple_res.status_code}")
                    print(f"Simple test response: {simple_res.get_json()}")
                
            except Exception as e:
                print(f"Exception capturada: {e}")
                print(f"Traceback: {traceback.format_exc()}")

if __name__ == "__main__":
    debug_exception_detail()
