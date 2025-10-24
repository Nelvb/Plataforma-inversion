"""
Test para el comando create_admin del script manage.py
Verifica que se crea correctamente un usuario administrador.
"""

from app.models.user import User


def test_create_admin_command_crea_usuario_admin(runner, app):
    """Ejecuta el comando create_admin desde Flask CLI y verifica el resultado."""

    with app.app_context():
        from app.cli.create_admin import create_admin
        app.cli.add_command(create_admin)

        # Limpiar admin existente si existe
        existing = User.query.filter_by(email="bapboostaproject@gmail.com").first()
        if existing:
            from app.extensions import db
            db.session.delete(existing)
            db.session.commit()

    result = runner.invoke(args=["create-admin"])
    # Verificar que el comando se ejecutó correctamente (puede crear o ya existir)
    assert result.exit_code == 0
    assert "Administrador creado exitosamente" in result.output or "ya existe" in result.output.lower()


    # Verificar en base de datos
    with app.app_context():
        user = User.query.filter_by(email="bapboostaproject@gmail.com").first()
        assert user is not None
        assert user.username == "Alberto"
        assert user.last_name == "Modroño Martín"
        assert user.is_admin is True
        assert user.check_password("Ayb.1981")
