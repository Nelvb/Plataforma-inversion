# -*- coding: utf-8 -*-
"""
test_favorite_model.py — Tests unitarios del modelo Favorite.

Contexto:
Verifica la creación de favoritos, relaciones con User y Project,
constraint único y timestamps automáticos.

Notas de mantenimiento:
- Utiliza fixtures de conftest.py (client, _db).
- Crea usuarios y proyectos temporales en cada test.
- Verifica IntegrityError al intentar duplicados.

@author Boost A Project Team
@since v2.1.0
"""

import pytest
from app.models.favorite import Favorite
from app.models.user import User
from app.models.project import Project
from app.extensions import db
from sqlalchemy.exc import IntegrityError


def test_create_favorite(client):
    """Test: Crear un favorito básico."""
    import uuid
    
    # Crear usuario y proyecto con datos únicos
    unique_id = str(uuid.uuid4())[:8]
    user = User(username=f"testuser_{unique_id}", email=f"test_{unique_id}@test.com", password_hash="hash")
    db.session.add(user)
    
    project = Project(
        slug=f"test-project-{unique_id}",
        title=f"Test Project {unique_id}",
        description="Test description",
        status="open"
    )
    db.session.add(project)
    db.session.commit()
    
    # Crear favorito
    favorite = Favorite(user_id=user.id, project_id=project.id)
    db.session.add(favorite)
    db.session.commit()
    
    # Verificar
    assert favorite.id is not None
    assert favorite.user_id == user.id
    assert favorite.project_id == project.id
    assert favorite.created_at is not None


def test_favorite_unique_constraint(client):
    """Test: No se permiten favoritos duplicados."""
    import uuid
    
    # Crear usuario y proyecto con datos únicos
    unique_id = str(uuid.uuid4())[:8]
    user = User(username=f"testuser2_{unique_id}", email=f"test2_{unique_id}@test.com", password_hash="hash")
    db.session.add(user)
    
    project = Project(
        slug=f"test-project-2-{unique_id}",
        title=f"Test Project 2 {unique_id}",
        description="Test description",
        status="open"
    )
    db.session.add(project)
    db.session.commit()
    
    # Crear primer favorito
    favorite1 = Favorite(user_id=user.id, project_id=project.id)
    db.session.add(favorite1)
    db.session.commit()
    
    # Intentar crear favorito duplicado
    favorite2 = Favorite(user_id=user.id, project_id=project.id)
    db.session.add(favorite2)
    
    with pytest.raises(IntegrityError):
        db.session.commit()
    
    db.session.rollback()


def test_favorite_relationships(client):
    """Test: Verificar relaciones con User y Project."""
    import uuid
    
    # Crear usuario y proyecto con datos únicos
    unique_id = str(uuid.uuid4())[:8]
    user = User(username=f"testuser3_{unique_id}", email=f"test3_{unique_id}@test.com", password_hash="hash")
    db.session.add(user)
    
    project = Project(
        slug=f"test-project-3-{unique_id}",
        title=f"Test Project 3 {unique_id}",
        description="Test description",
        status="open"
    )
    db.session.add(project)
    db.session.commit()
    
    # Crear favorito
    favorite = Favorite(user_id=user.id, project_id=project.id)
    db.session.add(favorite)
    db.session.commit()
    
    # Verificar relaciones
    assert favorite.user == user
    assert favorite.project == project
    assert favorite in user.favorites
    assert favorite in project.favorited_by


def test_favorite_repr(client):
    """Test: Verificar método __repr__."""
    favorite = Favorite(user_id=1, project_id=2)
    assert repr(favorite) == "<Favorite user_id=1 project_id=2>"


def test_delete_favorite(client):
    """Test: Eliminar un favorito."""
    import uuid
    
    # Crear usuario y proyecto con datos únicos
    unique_id = str(uuid.uuid4())[:8]
    user = User(username=f"testuser4_{unique_id}", email=f"test4_{unique_id}@test.com", password_hash="hash")
    db.session.add(user)
    
    project = Project(
        slug=f"test-project-4-{unique_id}",
        title=f"Test Project 4 {unique_id}",
        description="Test description",
        status="open"
    )
    db.session.add(project)
    db.session.commit()
    
    # Crear favorito
    favorite = Favorite(user_id=user.id, project_id=project.id)
    db.session.add(favorite)
    db.session.commit()
    
    favorite_id = favorite.id
    
    # Eliminar favorito
    db.session.delete(favorite)
    db.session.commit()
    
    # Verificar que ya no existe
    deleted = db.session.get(Favorite, favorite_id)
    assert deleted is None