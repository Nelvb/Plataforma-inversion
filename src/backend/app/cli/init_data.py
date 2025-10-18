"""
init_data.py — Comando Flask CLI para inicialización completa de datos.

Contexto:
Comando unificado que inicializa todo el sistema: admin + artículos + proyectos.
Ideal para primer deploy en producción o reseteo de desarrollo.

Notas de mantenimiento:
- Idempotente: seguro ejecutar múltiples veces
- Verifica existencia antes de crear
- Orden de ejecución: admin → artículos → proyectos

@author Boost A Project Team
@since v2.0.0
"""

import click
from flask.cli import with_appcontext
from app.models.user import User
from app.models.article import Article
from app.models.project import Project
from app.extensions import db
from werkzeug.security import generate_password_hash
import os
import json
import glob
from app.scripts.import_service import importar_proyectos_desde_json, importar_articulos_desde_json


@click.command('init-data')
@with_appcontext
def init_data():
    """Inicializa todos los datos del sistema (admin + artículos + proyectos)"""
    
    click.echo("=" * 60)
    click.echo("🚀 INICIALIZACIÓN COMPLETA DEL SISTEMA")
    click.echo("=" * 60)
    
    # 1. CREAR ADMIN
    click.echo("\n📋 PASO 1: Verificando usuario administrador...")
    existing_admin = User.query.filter_by(email='bapboostaproject@gmail.com').first()
    
    if existing_admin:
        click.echo("✓ El administrador ya existe")
    else:
        admin = User(
            username='Alberto',
            email='bapboostaproject@gmail.com',
            password_hash=generate_password_hash('Ayb.1981'),
            is_admin=True
        )
        db.session.add(admin)
        db.session.commit()
        click.echo("✓ Administrador creado correctamente")
    
    # 2. IMPORTAR ARTÍCULOS
    click.echo("\n📋 PASO 2: Verificando artículos...")
    articles_count = Article.query.count()
    
    if articles_count > 0:
        click.echo(f"✓ Ya existen {articles_count} artículos en la base de datos")
    else:
        articles_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'articles.json')
        
        if os.path.exists(articles_file):
            with open(articles_file, 'r', encoding='utf-8') as f:
                articles_data = json.load(f)
            
            resultados = importar_articulos_desde_json(articles_data)
            click.echo(f"✓ Importados {len(articles_data)} artículos")
        else:
            click.echo("⚠ Archivo articles.json no encontrado")
    
    # 3. IMPORTAR PROYECTOS
    click.echo("\n📋 PASO 3: Verificando proyectos...")
    projects_count = Project.query.count()
    
    if projects_count > 0:
        click.echo(f"✓ Ya existen {projects_count} proyectos en la base de datos")
    else:
        projects_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'projects')
        
        if os.path.exists(projects_dir):
            json_files = glob.glob(os.path.join(projects_dir, "*.json"))
            
            if json_files:
                all_projects_data = []
                
                for json_file in json_files:
                    with open(json_file, 'r', encoding='utf-8') as f:
                        file_data = json.load(f)
                        
                        if isinstance(file_data, list):
                            all_projects_data.extend(file_data)
                        else:
                            all_projects_data.append(file_data)
                
                resultados = importar_proyectos_desde_json(all_projects_data)
                click.echo(f"✓ Importados {len(all_projects_data)} proyectos")
            else:
                click.echo("⚠ No se encontraron archivos JSON en projects/")
        else:
            click.echo("⚠ Directorio projects/ no encontrado")
    
    click.echo("\n" + "=" * 60)
    click.echo("✅ INICIALIZACIÓN COMPLETADA")
    click.echo("=" * 60)


def init_app(app):
    """Registra el comando CLI en la aplicación Flask."""
    app.cli.add_command(init_data)
