"""
commands.py — Comandos Flask CLI para gestión de datos.

Contexto:
Define comandos personalizados de Flask CLI para importar artículos y proyectos.
Permite ejecutar importaciones desde la terminal de forma profesional.

Notas de mantenimiento:
- Comandos idempotentes (seguros de ejecutar múltiples veces)
- Validación de datos antes de importar
- Logging claro de resultados

@author Boost A Project Team
@since v2.0.0
"""

import click
from flask.cli import with_appcontext
import os
import json
import glob
from app.scripts.import_service import importar_proyectos_desde_json, importar_articulos_desde_json


@click.group()
def data():
    """Comandos para gestión de datos (artículos y proyectos)."""
    pass


@data.command('import-articles')
@with_appcontext
def import_articles():
    """Importa artículos desde app/data/articles.json"""
    
    articles_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'articles.json')
    
    if not os.path.exists(articles_file):
        click.echo(f"✗ Archivo no encontrado: {articles_file}")
        return
    
    try:
        with open(articles_file, 'r', encoding='utf-8') as f:
            articles_data = json.load(f)
        
        click.echo(f"📂 Encontrados {len(articles_data)} artículos")
        click.echo("-" * 60)
        
        resultados = importar_articulos_desde_json(articles_data)
        
        for msg in resultados:
            click.echo(msg)
        
        click.echo("-" * 60)
        click.echo("✅ Importación de artículos completada")
        
    except Exception as e:
        click.echo(f"✗ Error: {e}")


@data.command('import-projects')
@with_appcontext
def import_projects():
    """Importa proyectos desde app/data/projects/"""
    
    projects_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'projects')
    
    if not os.path.exists(projects_dir):
        click.echo(f"✗ Directorio no encontrado: {projects_dir}")
        return
    
    json_files = glob.glob(os.path.join(projects_dir, "*.json"))
    
    if not json_files:
        click.echo(f"✗ No se encontraron archivos .json en: {projects_dir}")
        return
    
    click.echo(f"📂 Encontrados {len(json_files)} archivo(s) JSON")
    click.echo("-" * 60)
    
    all_projects_data = []
    
    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                file_data = json.load(f)
                
                if isinstance(file_data, list):
                    all_projects_data.extend(file_data)
                    click.echo(f"✓ {os.path.basename(json_file)} - {len(file_data)} proyecto(s)")
                else:
                    all_projects_data.append(file_data)
                    click.echo(f"✓ {os.path.basename(json_file)} - 1 proyecto")
                    
        except json.JSONDecodeError as e:
            click.echo(f"✗ Error parseando {os.path.basename(json_file)}: {e}")
        except Exception as e:
            click.echo(f"✗ Error cargando {os.path.basename(json_file)}: {e}")
    
    click.echo("-" * 60)
    
    if all_projects_data:
        click.echo(f"🔄 Importando {len(all_projects_data)} proyecto(s)...")
        click.echo("-" * 60)
        
        resultados = importar_proyectos_desde_json(all_projects_data)
        
        for msg in resultados:
            click.echo(msg)
        
        click.echo("-" * 60)
        click.echo("✅ Importación de proyectos completada")
    else:
        click.echo("✗ No se encontraron datos válidos")


def init_app(app):
    """Registra los comandos CLI en la aplicación Flask."""
    app.cli.add_command(data)
