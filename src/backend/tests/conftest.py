# Configuración de fixtures para tests de la aplicación
# Define recursos compartidos como instancia de app, cliente HTTP, usuario de prueba y BD
# Gestiona ciclos de vida de los recursos con setup y teardown automáticos
# Actualizado para coincidir con UserSchema profesional (nombres reales, contraseñas seguras)

import pytest
import uuid
from app import create_app
from app.extensions import db
from app.models.user import User
from sqlalchemy import text
from app.config import TestingConfig
from flask_jwt_extended import create_access_token


@pytest.fixture(scope="session")
def app():
    """Crea y configura una instancia de Flask para las pruebas.
    Optimizado con scope='session' para reutilizar la app entre tests."""
    app = create_app(TestingConfig)

    # Establecer el contexto de la aplicación
    with app.app_context():
        # Crear todas las tablas una sola vez por sesión
        db.create_all()
        yield app
        # Limpiar después de todas las pruebas
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    """Crea un cliente de prueba."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """Crea un corredor de comandos de CLI para probar comandos de Flask."""
    return app.test_cli_runner()


@pytest.fixture
def _db(app):
    """Proporciona la extensión db."""
    return db


@pytest.fixture
def test_user(app):
    """Crea un usuario de prueba y devuelve sus datos planos para evitar errores de sesión.
    Actualizado para cumplir con UserSchema profesional: nombre real sin números,
    contraseña segura con complejidad requerida."""
    with app.app_context():
        # Verificar si el usuario ya existe para evitar duplicados
        existing_user = User.query.filter_by(email="test@example.com").first()
        if existing_user:
            return {
                "id": existing_user.id,
                "email": existing_user.email,
                "username": existing_user.username,
                "last_name": existing_user.last_name
            }
        
        user = User(username="TestUser", last_name="Test García", email="test@example.com")
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()
        return {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "last_name": user.last_name
        }


@pytest.fixture
def admin_token(app, _db):
    """Crea un usuario admin y devuelve su Bearer token JWT.
    Usa email único para evitar conflictos en tests paralelos."""
    with app.app_context():
        unique_id = str(uuid.uuid4())[:8]
        admin = User(
            username=f"admin_test_{unique_id}", 
            email=f"admin_{unique_id}@test.com", 
            is_admin=True
        )
        admin.set_password("admin123")
        _db.session.add(admin)
        _db.session.commit()
        
        # Generar token JWT directamente
        token = create_access_token(identity=str(admin.id))
        return token


@pytest.fixture
def user_token(app, _db):
    """Crea un usuario regular y devuelve su Bearer token JWT.
    Usa email único para evitar conflictos en tests paralelos."""
    with app.app_context():
        unique_id = str(uuid.uuid4())[:8]
        user = User(
            username=f"user_test_{unique_id}", 
            email=f"user_{unique_id}@test.com", 
            is_admin=False
        )
        user.set_password("user123")
        _db.session.add(user)
        _db.session.commit()
        
        # Generar token JWT directamente
        token = create_access_token(identity=str(user.id))
        return token