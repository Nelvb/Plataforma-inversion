# -*- coding: utf-8 -*-
"""
test_favorites_api.py — Tests de los endpoints REST de favoritos.

Contexto:
Verifica que los endpoints GET, POST y DELETE de /api/favorites funcionen correctamente
con autenticación JWT en cookies + CSRF token.

Notas de mantenimiento:
- JWT está en COOKIES, no en headers Authorization.
- Requiere login previo para obtener cookie de sesión.
- Usa X-CSRF-TOKEN header para protección CSRF.

@author Boost A Project Team
@since v2.1.0
"""

import pytest
from app.models.favorite import Favorite
from app.models.project import Project
from app.models.user import User
from app.extensions import db


@pytest.fixture
def logged_user(client, app):
    """Crea un usuario único por test y devuelve credenciales + CSRF token tras login."""
    import uuid
    
    unique_id = str(uuid.uuid4())[:8]
    email = f"favuser_{unique_id}@test.com"
    
    with app.app_context():
        user = User(username=f"FavUser_{unique_id}", last_name="Test", email=email)
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()
        user_id = user.id
    
    # Login para obtener cookie JWT + CSRF
    login_res = client.post("/api/auth/login", json={
        "email": email,
        "password": "SecurePass123!"
    })
    
    assert login_res.status_code == 200
    csrf_token = login_res.json["csrf_token"]
    
    return {"user_id": user_id, "csrf_token": csrf_token}


def test_get_favorites_unauthorized(client):
    """Test: GET /api/favorites sin JWT debe retornar 401."""
    response = client.get("/api/favorites/")
    assert response.status_code == 401


def test_get_favorites_empty(client, logged_user):
    """Test: GET /api/favorites retorna array vacío si no hay favoritos."""
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    response = client.get("/api/favorites/", headers=headers)
    
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) == 0


def test_add_favorite_success(client, logged_user, app):
    """Test: POST /api/favorites añade un favorito correctamente."""
    with app.app_context():
        # Crear proyecto de prueba
        project = Project(
            slug="test-fav-project",
            title="Test Favorite Project",
            description="Test description",
            status="open"
        )
        db.session.add(project)
        db.session.commit()
        project_id = project.id
        
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    data = {"project_id": project_id}
    
    response = client.post("/api/favorites/", json=data, headers=headers)
    
    assert response.status_code == 201
    assert response.json["project_id"] == project_id
    assert response.json["user_id"] == logged_user["user_id"]
    assert "created_at" in response.json


def test_add_favorite_unauthorized(client):
    """Test: POST /api/favorites sin JWT debe retornar 401."""
    data = {"project_id": 1}
    response = client.post("/api/favorites/", json=data)
    
    assert response.status_code == 401


def test_add_favorite_no_data(client, logged_user):
    """Test: POST /api/favorites sin body debe retornar 400 o 415."""
    headers = {
        "X-CSRF-TOKEN": logged_user["csrf_token"],
        "Content-Type": "application/json"
    }
    response = client.post("/api/favorites/", headers=headers)
    
    assert response.status_code in (400, 415)
    if response.json is not None:
        assert "error" in response.json

def test_add_favorite_invalid_project(client, logged_user):
    """Test: POST /api/favorites con project_id inválido debe retornar 400."""
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    data = {"project_id": "invalid"}
    
    response = client.post("/api/favorites/", json=data, headers=headers)
    
    assert response.status_code == 400


def test_add_favorite_nonexistent_project(client, logged_user):
    """Test: POST /api/favorites con project_id inexistente debe retornar 404."""
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    data = {"project_id": 99999}
    
    response = client.post("/api/favorites/", json=data, headers=headers)
    
    assert response.status_code == 404
    assert response.json is not None
    assert "error" in response.json


def test_add_favorite_duplicate(client, logged_user, app):
    """Test: POST /api/favorites duplicado debe retornar 409."""
    with app.app_context():
        # Crear proyecto
        project = Project(
            slug="test-duplicate-fav",
            title="Test Duplicate",
            description="Test description",
            status="open"
        )
        db.session.add(project)
        db.session.commit()
        
        # Crear favorito inicial
        favorite = Favorite(user_id=logged_user["user_id"], project_id=project.id)
        db.session.add(favorite)
        db.session.commit()
        project_id = project.id
        
    # Intentar añadir duplicado
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    data = {"project_id": project_id}
    
    response = client.post("/api/favorites/", json=data, headers=headers)
    
    assert response.status_code == 409
    assert "error" in response.json


def test_get_favorites_with_data(client, logged_user, app):
    """Test: GET /api/favorites retorna favoritos con datos del proyecto."""
    with app.app_context():
        # Crear proyecto
        project = Project(
            slug="test-get-fav",
            title="Test Get Favorite",
            description="Test description",
            status="open"
        )
        db.session.add(project)
        db.session.commit()
        
        # Añadir favorito
        favorite = Favorite(user_id=logged_user["user_id"], project_id=project.id)
        db.session.add(favorite)
        db.session.commit()
        
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    response = client.get("/api/favorites/", headers=headers)
    
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]["project_id"]
    assert "project" in response.json[0]
    assert response.json[0]["project"]["slug"] == "test-get-fav"


def test_remove_favorite_success(client, logged_user, app):
    """Test: DELETE /api/favorites/<project_id> elimina favorito correctamente."""
    with app.app_context():
        # Crear proyecto
        project = Project(
            slug="test-remove-fav",
            title="Test Remove",
            description="Test description",
            status="open"
        )
        db.session.add(project)
        db.session.commit()
        
        # Añadir favorito
        favorite = Favorite(user_id=logged_user["user_id"], project_id=project.id)
        db.session.add(favorite)
        db.session.commit()
        
        favorite_id = favorite.id
        project_id = project.id
        
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    response = client.delete(f"/api/favorites/{project_id}", headers=headers)
    
    assert response.status_code == 200
    assert "message" in response.json
    
    # Verificar que ya no existe
    with app.app_context():
        deleted = db.session.get(Favorite, favorite_id)
        assert deleted is None


def test_remove_favorite_unauthorized(client):
    """Test: DELETE /api/favorites/<project_id> sin JWT debe retornar 401."""
    response = client.delete("/api/favorites/1")
    assert response.status_code == 401


def test_remove_favorite_not_found(client, logged_user):
    """Test: DELETE /api/favorites/<project_id> inexistente debe retornar 404."""
    headers = {"X-CSRF-TOKEN": logged_user["csrf_token"]}
    response = client.delete("/api/favorites/99999", headers=headers)
    
    assert response.status_code == 404
    assert response.json is not None
    assert "error" in response.json