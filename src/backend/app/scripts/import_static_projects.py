#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
import_static_projects.py — Script para importar proyectos desde JSON.

Contexto:
Lee todos los archivos .json del directorio app/data/projects/ y los importa
o actualiza en la base de datos usando la función importar_proyectos_desde_json.

Ejecutar desde src/backend/:
    python -m app.scripts.import_static_projects

Notas de mantenimiento:
- Compatible con modelo flexible de Project (investment_data, content_sections)
- Evita duplicados verificando por slug
- Soporta múltiples archivos JSON en el directorio

@author Boost A Project Team
@since v2.0.0
"""

import os
import json
import glob
from app import create_app
from app.extensions import db
from app.scripts.import_service import importar_proyectos_desde_json

# Directorio con los archivos JSON de proyectos
PROJECTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'projects')

# Crear app y ejecutar dentro del contexto
app = create_app()

with app.app_context():
    all_projects_data = []
    
    # Verificar que el directorio existe
    if not os.path.exists(PROJECTS_DIR):
        print(f"✗ Directorio no encontrado: {PROJECTS_DIR}")
        exit(1)
    
    # Buscar todos los archivos JSON en el directorio projects/
    json_files = glob.glob(os.path.join(PROJECTS_DIR, "*.json"))
    
    if not json_files:
        print(f"✗ No se encontraron archivos .json en: {PROJECTS_DIR}")
        exit(1)
    
    print(f"📂 Encontrados {len(json_files)} archivo(s) JSON")
    print("-" * 60)
    
    # Cargar datos de todos los archivos
    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                file_data = json.load(f)
                
                # Si el archivo contiene un array, agregar todos los elementos
                if isinstance(file_data, list):
                    all_projects_data.extend(file_data)
                    print(f"✓ {os.path.basename(json_file)} - {len(file_data)} proyecto(s)")
                else:
                    # Si es un objeto individual, agregarlo como elemento único
                    all_projects_data.append(file_data)
                    print(f"✓ {os.path.basename(json_file)} - 1 proyecto")
                    
        except json.JSONDecodeError as e:
            print(f"✗ Error parseando {os.path.basename(json_file)}: {e}")
        except Exception as e:
            print(f"✗ Error cargando {os.path.basename(json_file)}: {e}")
    
    print("-" * 60)
    
    # Importar proyectos si se cargaron datos
    if all_projects_data:
        print(f"🔄 Importando {len(all_projects_data)} proyecto(s)...")
        print("-" * 60)
        
        resultados = importar_proyectos_desde_json(all_projects_data)
        
        for msg in resultados:
            print(msg)
        
        print("-" * 60)
        print(f"✅ Proceso completado - {len(json_files)} archivo(s) procesado(s)")
    else:
        print("✗ No se encontraron datos válidos en los archivos JSON")