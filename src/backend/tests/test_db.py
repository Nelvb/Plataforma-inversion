# Tests de conexión a base de datos y operaciones con modelos
# Verifica la correcta interacción entre los modelos y PostgreSQL
# Comprueba la creación y recuperación de usuarios con persistencia de datos

import pytest
from app.extensions import db
from app.models.user import User


def test_crear_usuario(app):
    """Prueba la creación de un usuario en la base de datos."""
    with app.app_context():
        # Insertar un usuario nuevo
        nuevo_usuario = User(username="Nelson", last_name="Valero", email="nelson@example.com")
        nuevo_usuario.set_password("1234")
        db.session.add(nuevo_usuario)
        db.session.commit()

        # Verificar que se guardó bien
        usuario = User.query.filter_by(email="nelson@example.com").first()
        assert usuario is not None
        assert usuario.username == "Nelson"
        assert usuario.last_name == "Valero"
        assert usuario.check_password("1234") is True
