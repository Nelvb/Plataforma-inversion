# -*- coding: utf-8 -*-
"""
create_admin.py — Comando CLI para crear el usuario administrador por defecto.

Contexto:
Integración nativa con Flask CLI.
Permite ejecutar directamente:
    flask create-admin

Notas de mantenimiento:
- Evita duplicados verificando el email.
- Usa generate_password_hash (seguro).
- Funciona dentro del contexto de la app principal.
"""

import click
from flask.cli import with_appcontext
from werkzeug.security import generate_password_hash
from app.extensions import db
from app.models.user import User

@click.command("create-admin")
@with_appcontext
def create_admin():
    """Crea un usuario administrador por defecto si no existe."""
    username = "Alberto"
    last_name = "Modroño Martín"
    email = "bapboostaproject@gmail.com"
    password = "Ayb.1981"

    existing = User.query.filter_by(email=email).first()
    if existing:
        click.echo("⚠️  Ya existe un usuario administrador con este email.")
        return

    admin_user = User(
        username=username,
        last_name=last_name,
        email=email,
        password=generate_password_hash(password),
        is_admin=True,
    )

    db.session.add(admin_user)
    db.session.commit()
    click.echo("✅ Usuario administrador creado correctamente.")
