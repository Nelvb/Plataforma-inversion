import pytest
from app import create_app
from app.extensions import db
from app.models.article import Article

# Crear la app de prueba
@pytest.fixture
def app():
    app = create_app('testing')  # Usar el entorno de testing
    with app.app_context():
        yield app

# Configuración de la base de datos de prueba
@pytest.fixture
def init_db(app):
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()

# Test para crear un artículo
def test_create_article(app, init_db):
    article_data = {
        'title': 'Nuevo artículo de prueba',
        'slug': 'nuevo-articulo-de-prueba',
        'author': 'Boost A Project',
        'date': '2025-04-10',
        'excerpt': 'Este es un artículo de prueba',
        'image': 'https://example.com/image.jpg',
        'content': 'Contenido del artículo',
        'meta_description': 'Descripción meta del artículo',
        'meta_keywords': 'artículo, prueba, seo'
    }
    response = app.test_client().post('/api/articles', json=article_data)
    assert response.status_code == 201  # 201 creado
    assert 'slug' in response.json  # Asegurarse de que el slug está en la respuesta

# Test para obtener todos los artículos
def test_get_articles(app, init_db):
    response = app.test_client().get('/api/articles')
    assert response.status_code == 200
    assert isinstance(response.json, list)  # Asegurarse de que es una lista

# Test para obtener un artículo por slug
def test_get_article_by_slug(app, init_db):
    article = Article(title='Test', slug='test-article', content='Test content', image='image.jpg')
    db.session.add(article)
    db.session.commit()
    
    response = app.test_client().get(f'/api/articles/{article.slug}')
    assert response.status_code == 200
    assert response.json['slug'] == article.slug  # Asegurarse de que el slug es correcto
