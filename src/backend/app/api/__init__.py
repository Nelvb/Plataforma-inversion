# Archivo de inicialización para el módulo de API
# Define el paquete api para organizar las rutas y endpoints en el backend

from flask import Flask
from app.api.projects import projects_bp

def register_api_blueprints(app: Flask):
    """Registra todos los blueprints de la API"""
    app.register_blueprint(projects_bp)