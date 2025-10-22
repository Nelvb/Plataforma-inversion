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
db = SQLAlchemy()
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
    
    # Configuración completa de CORS
    cors.init_app(app, 
            resources={r"/api/*": {
                    "origins": [
                        "http://localhost:3000",
                        "https://boost-a-project.vercel.app"
                    ],
                    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                    "allow_headers": ["Content-Type", "Authorization", "X-CSRF-TOKEN"],
                    "supports_credentials": True
                }},
                supports_credentials=True)
    
    mail.init_app(app)


# Asegurándonos de que init_app está exportado correctamente
__all__ = ["db", "migrate", "jwt", "ma", "cors", "mail", "init_app"]