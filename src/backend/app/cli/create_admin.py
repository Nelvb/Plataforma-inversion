"""
create_admin.py — Comando CLI para crear el usuario administrador por defecto.

Contexto:
Este comando se integra con el CLI nativo de Flask, permitiendo ejecutar:
    flask create-admin

Dependencias:
- Flask app context
- SQLAlchemy para persistencia
- User model

Notas de mantenimiento:
El comando detecta si el admin ya existe (por email) y evita duplicados.
"""

import click
from flask.cli import with_appcontext
from app.models.user import User
from app.extensions import db
from werkzeug.security import generate_password_hash

@click.command("create-admin")
@with_appcontext
def create_admin():
    """Crea un usuario administrador por defecto si no existe."""
    email = "bapboostaproject@gmail.com"
    if User.query.filter_by(email=email).first():
        click.echo("El administrador ya existe.")
        return

    admin = User(
        username="Alberto",
        last_name="Modroño Martín",
        email=email,
        password_hash=generate_password_hash("Ayb.1981"),
        is_admin=True,
    )

    db.session.add(admin)
    db.session.commit()
    click.echo("Administrador creado exitosamente.")
