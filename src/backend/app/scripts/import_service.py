# import_service.py
# -----------------------------------------------------------------------------
# Servicio para importar artículos desde un archivo JSON a la base de datos.
# Esta función puede usarse tanto desde CLI como en tests con mocking.
# Maneja creación o actualización según si el slug ya existe.
# -----------------------------------------------------------------------------

import sqlalchemy as sa
from app.extensions import db
from app.models.article import Article
from app.models.project import Project


def importar_articulos_desde_json(articles_data):
    """
    Importa artículos desde una lista de diccionarios (parsed JSON).
    - Actualiza los artículos existentes por slug.
    - Crea nuevos si no existen.
    Devuelve una lista con mensajes por cada acción.
    """
    resultados = []

    for item in articles_data:
        existing = Article.query.filter_by(slug=item['slug']).first()

        if existing:
            existing.title = item['title']
            existing.excerpt = item['excerpt']
            existing.image = item['image']
            existing.image_alt = item.get('image_alt', existing.image_alt)
            existing.content = item['content']
            existing.meta_description = item['meta_description']
            existing.meta_keywords = item['meta_keywords']
            existing.updated_at = sa.func.now()

            db.session.commit()
            resultados.append(f"Artículo actualizado: {item['slug']}")
        else:
            item.pop("id", None)  # Si el JSON trae ID, ignorarlo
            nuevo = Article(**item)
            db.session.add(nuevo)
            db.session.commit()
            resultados.append(f"Artículo creado: {item['slug']}")

    return resultados


def importar_proyectos_desde_json(data: list) -> list[str]:
    """
    Importa proyectos desde una lista de diccionarios (parsed JSON).
    - Verifica si el proyecto ya existe por slug o título.
    - Si no existe, crea una nueva instancia del modelo Project.
    - Maneja campos opcionales y errores de forma robusta.
    Devuelve una lista con mensajes por cada acción realizada.
    """
    resultados = []
    
    try:
        for item in data:
            try:
                # Verificar si ya existe por slug o título
                existing_by_slug = Project.query.filter_by(slug=item.get('slug')).first()
                existing_by_title = Project.query.filter_by(title=item.get('title')).first()
                
                if existing_by_slug or existing_by_title:
                    resultados.append(f"Proyecto '{item.get('slug', item.get('title'))}' ya existe.")
                    continue
                
                # Mapear campos del JSON a los campos del modelo
                project_data = {
                    'title': item.get('title'),
                    'slug': item.get('slug'),
                    'description': item.get('description'),
                    'image_url': item.get('image_url'),
                    'investment_goal': item.get('investment_goal'),
                    'location': item.get('location'),
                    'investment_type': item.get('investment_type'),
                    'surface_m2': item.get('area_m2'),  # Mapear area_m2 a surface_m2
                    'rooms': item.get('rooms'),
                    'bathrooms': item.get('bathrooms'),
                    'min_investment': item.get('investment_min'),  # Mapear investment_min a min_investment
                    'expected_return': str(item.get('expected_return', '')),  # Convertir a string
                    'optimistic_return': str(item.get('optimistic_return', '')) if item.get('optimistic_return') else None,
                    'estimated_duration': item.get('estimated_duration'),  # Campo ya coincide
                    'status': item.get('status', 'Abierto'),
                    'financial_structure_text': item.get('financial_structure_text'),
                    'rentability_projection': item.get('rentability_projection'),
                    'risk_analysis': item.get('risk_analysis'),
                    'team_description': item.get('team_description'),
                    'external_link': item.get('external_link')
                }
                
                # Filtrar valores None para campos opcionales
                project_data = {k: v for k, v in project_data.items() if v is not None}
                
                # Crear nueva instancia del proyecto
                nuevo_proyecto = Project(**project_data)
                db.session.add(nuevo_proyecto)
                
                resultados.append(f"Proyecto '{item.get('title')}' importado correctamente.")
                
            except Exception as e:
                resultados.append(f"Error importando proyecto '{item.get('title', 'desconocido')}': {str(e)}")
                continue
        
        # Commit único al final
        db.session.commit()
        
    except Exception as e:
        db.session.rollback()
        resultados.append(f"Error general en la importación: {str(e)}")
    
    return resultados
