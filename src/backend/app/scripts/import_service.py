# import_service.py
# -----------------------------------------------------------------------------
# Servicio para importar artículos y proyectos desde archivos JSON a la base de datos.
# Compatible con el modelo flexible de Project (investment_data, content_sections).
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
            item.pop("id", None)
            nuevo = Article(**item)
            db.session.add(nuevo)
            db.session.commit()
            resultados.append(f"Artículo creado: {item['slug']}")

    return resultados


def importar_proyectos_desde_json(data: list) -> list[str]:
    """
    Importa/actualiza proyectos desde una lista de diccionarios (parsed JSON).
    Compatible con el modelo flexible de Project v2.0 (investment_data, content_sections).
    
    - Actualiza proyectos existentes por slug.
    - Crea nuevos si no existen.
    - Maneja campos JSON (gallery, investment_data, content_sections).
    
    Devuelve una lista con mensajes por cada acción realizada.
    """
    resultados = []
    
    try:
        for item in data:
            try:
                slug = item.get('slug')
                if not slug:
                    resultados.append("Proyecto sin slug - omitido")
                    continue
                
                existing = Project.query.filter_by(slug=slug).first()
                
                if existing:
                    # ACTUALIZAR proyecto existente
                    existing.title = item.get('title', existing.title)
                    existing.subtitle = item.get('subtitle', existing.subtitle)
                    existing.description = item.get('description', existing.description)
                    existing.status = item.get('status', existing.status)
                    existing.category = item.get('category', existing.category)
                    existing.featured = item.get('featured', existing.featured)
                    existing.priority = item.get('priority', existing.priority)
                    
                    # Imágenes
                    existing.main_image_url = item.get('main_image_url', existing.main_image_url)
                    existing.gallery = item.get('gallery', existing.gallery)
                    
                    # Campos JSON principales (modelo flexible)
                    existing.investment_data = item.get('investment_data', existing.investment_data)
                    existing.content_sections = item.get('content_sections', existing.content_sections)
                    
                    existing.updated_at = sa.func.now()
                    
                    resultados.append(f"Proyecto actualizado: {slug}")
                    
                else:
                    # CREAR proyecto nuevo
                    nuevo_proyecto = Project(
                        slug=slug,
                        title=item.get('title'),
                        subtitle=item.get('subtitle'),
                        description=item.get('description'),
                        status=item.get('status', 'open'),
                        category=item.get('category'),
                        featured=item.get('featured', False),
                        priority=item.get('priority', 0),
                        main_image_url=item.get('main_image_url'),
                        gallery=item.get('gallery'),
                        investment_data=item.get('investment_data'),
                        content_sections=item.get('content_sections'),
                        views=0
                    )
                    
                    db.session.add(nuevo_proyecto)
                    
                    resultados.append(f"Proyecto creado: {slug}")
                
            except Exception as e:
                resultados.append(f"Error con proyecto '{item.get('title', 'desconocido')}': {str(e)}")
                db.session.rollback()
                continue
        
        # Commit único al final si todo fue bien
        db.session.commit()
        
    except Exception as e:
        db.session.rollback()
        resultados.append(f"Error general en la importación: {str(e)}")
    
    return resultados