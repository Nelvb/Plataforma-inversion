# src/backend/app/__init__.py
# ------------------------------------------------------------
# Punto de entrada principal para la aplicación Flask.
#
# Implementa un patrón Factory para crear la instancia de la app con su configuración,
# extensiones, middlewares y rutas (blueprints) registradas.
# Centraliza toda la configuración para mantener el proyecto organizado y escalable.
# ------------------------------------------------------------

from flask import Flask
from flask_cors import CORS
from app.api.auth import auth_bp
from app.api.users import users_bp
from app.api.routes import routes
from app.api.articles import articles_bp
from app.api.images import images_bp
from app.api.account import account_bp
from app.api.projects import projects_bp
from app.config import DevelopmentConfig
from app.extensions import cors, db, init_app, jwt, ma, migrate
from app.services.image_service import ImageService
import os
import json
from sqlalchemy import inspect


def create_app(config_object=DevelopmentConfig):
    """
    Función fábrica para crear la aplicación Flask.
    - Carga configuración según entorno.
    - Inicializa extensiones (DB, JWT, CORS, migraciones, etc.).
    - Inicializa Cloudinary para subir imágenes.
    - Registra todos los blueprints.
    - Importa artículos y proyectos estáticos si las tablas existen y están vacías.
    """

    # Crear la instancia Flask
    app = Flask(__name__)

    # Cargar configuración según entorno
    app.config.from_object(config_object)

    # Configuración global de CORS para el frontend (desarrollo y producción)
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:3000",
                    "https://boost-a-project.vercel.app"
                ],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization", "X-CSRF-TOKEN"],
                "supports_credentials": True,
                "expose_headers": ["Content-Type", "X-CSRFToken"],
            }
        },
        supports_credentials=True,
    )

    # Inicializar extensiones (db, jwt, mail, etc.)
    init_app(app)

    # Inicializar Cloudinary para imágenes
    ImageService.init_cloudinary(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(routes, url_prefix="/api")
    app.register_blueprint(articles_bp, url_prefix="/api/articles")
    app.register_blueprint(images_bp, url_prefix="/api/images")
    app.register_blueprint(account_bp, url_prefix="/api/account")
    app.register_blueprint(projects_bp, url_prefix="/api/projects")

    # # Importar artículos estáticos si tabla `articles` existe y está vacía
    # with app.app_context():
    #     try:
    #         inspector = inspect(db.engine)
    #         if "articles" in inspector.get_table_names():
    #             from app.models.article import Article
    #             from app.scripts.import_service import importar_articulos_desde_json

    #             if Article.query.count() == 0:
    #                 json_path = os.path.join(os.path.dirname(__file__), "data", "articles.json")
    #                 if os.path.exists(json_path):
    #                     with open(json_path, "r", encoding="utf-8") as f:
    #                         articles_data = json.load(f)
    #                     resultados = importar_articulos_desde_json(articles_data)
    #                     for msg in resultados:
    #                         app.logger.info(msg)
    #                     app.logger.info("Artículos estáticos importados correctamente.")
    #                 else:
    #                     app.logger.warning(f"Archivo no encontrado: {json_path}")
    #     except Exception as e:
    #         app.logger.warning(f"No se pudo verificar ni importar artículos: {e}")

    # # Importar proyectos iniciales si tabla `projects` existe y está vacía
    # with app.app_context():
    #     try:
    #         inspector = inspect(db.engine)
    #         if "projects" in inspector.get_table_names():
    #             from app.models.project import Project
    #             from app.scripts.import_service import importar_proyectos_desde_json

    #             if Project.query.count() == 0:
    #                 json_path = os.path.join(os.path.dirname(__file__), "data", "projects.json")
    #                 if os.path.exists(json_path):
    #                     with open(json_path, "r", encoding="utf-8") as f:
    #                         projects_data = json.load(f)
    #                     resultados = importar_proyectos_desde_json(projects_data)
    #                     for msg in resultados:
    #                         app.logger.info(msg)
    #                     app.logger.info("Proyectos iniciales importados correctamente.")
    #                 else:
    #                     app.logger.warning(f"Archivo no encontrado: {json_path}")
    #     except Exception as e:
    #         app.logger.warning(f"No se pudo verificar ni importar proyectos: {e}")

    # Registrar comandos CLI
    from app.cli.create_admin import create_admin
    from app.cli import commands
    from app.cli import init_data

    app.cli.add_command(create_admin)
    commands.init_app(app)
    init_data.init_app(app)

    return app
