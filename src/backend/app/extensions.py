# Inicialización centralizada de extensiones Flask para la aplicación
# Configura componentes como ORM, migraciones, JWT, serialización, CORS y sistema de email
# Implementa patrón de inicialización tardía para flexibilidad en tests y configuración

from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

# Inicializar las extensiones sin aplicación
# Se añade reconexión automática al pool para evitar errores con Neon (SSL connection closed)
db = SQLAlchemy(engine_options={
    "pool_pre_ping": True,   # Verifica la conexión antes de cada uso
    "pool_recycle": 280      # Recicla conexiones cada 280 segundos para evitar expiración
})
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
cors = CORS()
mail = Mail()


def init_app(app):
    """
    Inicializa las extensiones con la aplicación Flask.
    """
    db.init_app(app)
    migrate.init_app(app, db)

    jwt.init_app(app)
    ma.init_app(app)
    
    # Configuración CORS dinámica según entorno
    if app.config.get('DEBUG', False):  # Desarrollo
        cors_origins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ]
        app.logger.info(f"[CORS] Configuración DESARROLLO: {cors_origins}")
    else:  # Producción
        cors_origins = [
            "https://boostaproject.es",
            "https://www.boostaproject.es"
        ]
        app.logger.info(f"[CORS] Configuración PRODUCCIÓN: {cors_origins}")
    
    cors.init_app(app,
        resources={
            r"/api/*": {
                "origins": cors_origins,
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": [
                    "Content-Type",
                    "Authorization",
                    "X-CSRF-TOKEN",
                    "X-Requested-With"
                ],
                "supports_credentials": True,
                "expose_headers": ["Content-Type", "X-CSRFToken"]
            }
        },
        supports_credentials=True
    )

    
    mail.init_app(app)


# Asegurándonos de que init_app está exportado correctamente
__all__ = ["db", "migrate", "jwt", "ma", "cors", "mail", "init_app"]
