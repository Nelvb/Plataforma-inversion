# src/backend/app/__init__.py
# ------------------------------------------------------------
# Punto de entrada principal para la aplicación Flask.
#
# Implementa un patrón Factory para crear la instancia de la app con su configuración,
# extensiones, middlewares y rutas (blueprints) registradas.
# Centraliza toda la configuración para mantener el proyecto organizado y escalable.
# Incluye inyección automática de datos iniciales en producción (admin, artículos y proyectos).
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
from app.api.favorites import favorites_bp
from app.config import config_class
from app.extensions import cors, db, init_app, jwt, ma, migrate
from app.services.image_service import ImageService
import os
import json
from time import sleep
from sqlalchemy import inspect


def create_app(config_object=config_class):
    """
    Función fábrica para crear la aplicación Flask.
    - Carga configuración según entorno.
    - Inicializa extensiones (DB, JWT, CORS, migraciones, etc.).
    - Inicializa Cloudinary para subir imágenes.
    - Registra todos los blueprints.
    - Inyecta automáticamente admin, artículos y proyectos si la BD está vacía.
    """

    # Crear la instancia Flask
    app = Flask(__name__)
    
    # Configurar nivel de logging
    import logging
    app.logger.setLevel(logging.INFO)

    # Cargar configuración según entorno
    app.config.from_object(config_object)

    # Log del entorno y configuración activa
    print(f"[CONFIG] Entorno Flask activo: {app.config.get('ENV', 'no definido')}")
    print(f"[CONFIG] Clase de configuración activa: {app.config.__class__.__name__}")
    print(f"[CONFIG] CORS_ORIGINS: {app.config.get('CORS_ORIGINS')}")

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
    app.register_blueprint(favorites_bp)

    # ------------------------------------------------------------
    # INYECCIÓN AUTOMÁTICA DE DATOS EN PRODUCCIÓN (segura e idempotente)
    # ------------------------------------------------------------
    with app.app_context():
        from app.models.user import User
        from app.scripts.import_service import importar_articulos_desde_json, importar_proyectos_desde_json
        from werkzeug.security import generate_password_hash

        try:
            # Esperar a que las tablas estén creadas (Render puede tardar unos segundos)
            inspector = inspect(db.engine)
            for i in range(5):
                tables = inspector.get_table_names()
                if "users" in tables and "articles" in tables and "projects" in tables:
                    break
                app.logger.info("Esperando que las tablas se creen en la base de datos...")
                sleep(3)
                inspector = inspect(db.engine)

            # Crear admin si no existe
            admin = User.query.filter_by(email="bapboostaproject@gmail.com").first()
            if not admin:
                nuevo_admin = User(
                    username="Alberto",
                    last_name="Admin",
                    email="bapboostaproject@gmail.com",
                    password_hash=generate_password_hash("Ayb.1981"),
                    is_admin=True,
                )
                db.session.add(nuevo_admin)
                db.session.commit()
                app.logger.info("Usuario admin creado automáticamente.")
            else:
                app.logger.info("Usuario admin ya existe, no se recrea.")

            # Importar artículos si tabla vacía
            articulos_cargados = 0
            if "articles" in tables:
                from app.models.article import Article
                if Article.query.count() == 0:
                    json_path = os.path.join(os.path.dirname(__file__), "data", "articles.json")
                    if os.path.exists(json_path):
                        with open(json_path, "r", encoding="utf-8") as f:
                            articles_data = json.load(f)
                        importar_articulos_desde_json(articles_data)
                        articulos_cargados = len(articles_data)
                        app.logger.info("Artículos importados automáticamente.")
                    else:
                        app.logger.warning("Archivo de artículos no encontrado.")
                else:
                    articulos_cargados = Article.query.count()
                    app.logger.info("Artículos ya presentes en la base de datos.")

            # Importar proyectos si tabla vacía
            proyectos_cargados = 0
            if "projects" in tables:
                from app.models.project import Project
                if Project.query.count() == 0:
                    json_dir = os.path.join(os.path.dirname(__file__), "data", "projects")
                    if os.path.isdir(json_dir):
                        for file in os.listdir(json_dir):
                            if file.endswith(".json"):
                                with open(os.path.join(json_dir, file), "r", encoding="utf-8") as f:
                                    projects_data = json.load(f)
                                # Convertir objeto a array si es necesario
                                if isinstance(projects_data, dict):
                                    projects_data = [projects_data]
                                importar_proyectos_desde_json(projects_data)
                                proyectos_cargados += len(projects_data)
                                app.logger.info(f"Proyecto importado automáticamente desde {file}")
                    else:
                        app.logger.warning("Carpeta de proyectos no encontrada.")
                else:
                    proyectos_cargados = Project.query.count()
                    app.logger.info("Proyectos ya presentes en la base de datos.")

            # Resumen final en logs
            app.logger.info(f"📊 Artículos cargados: {articulos_cargados}")
            app.logger.info(f"📊 Proyectos cargados: {proyectos_cargados}")

        except Exception as e:
            app.logger.warning(f"Error en la inicialización automática: {e}")

    # ------------------------------------------------------------
    # Registrar comandos CLI
    # ------------------------------------------------------------
    from app.cli.create_admin import create_admin
    from app.cli import commands
    from app.cli import init_data

    app.cli.add_command(create_admin)
    commands.init_app(app)
    init_data.init_app(app)

    return app
