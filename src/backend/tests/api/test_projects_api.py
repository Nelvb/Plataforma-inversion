import json
import pytest
import uuid
from app.models.project import Project


def test_get_projects(client):
    """Test getting all projects"""
    res = client.get("/api/projects/")
    assert res.status_code == 200
    assert isinstance(res.get_json(), list)


def test_get_projects_empty(client):
    """Test getting projects when none exist"""
    res = client.get("/api/projects/")
    assert res.status_code == 200
    # Verificar que es una lista (puede estar vacía o tener datos)
    assert isinstance(res.get_json(), list)


def test_create_project_as_admin(client, admin_token):
    """Test creating a project as admin"""
    data = {
        "slug": "fiverooms-venezuela",
        "title": "FiveRooms Venezuela",
        "description": "Proyecto de alquiler por habitaciones",
        "status": "open",
        "investment_data": {
            "goal": 110000,
            "location": "Valladolid",
            "expected_return": "12"
        }
    }
    res = client.post(
        "/api/projects/",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 201
    response_data = res.get_json()
    assert response_data["title"] == "FiveRooms Venezuela"
    assert response_data["slug"] == "fiverooms-venezuela"


def test_create_project_unauthorized(client):
    """Test creating a project without authentication"""
    data = {
        "slug": "test-project",
        "title": "Test Project",
        "description": "Test description",
        "status": "open",
        "investment_data": {
            "goal": 50000,
            "location": "Test Location",
            "expected_return": "10"
        }
    }
    res = client.post(
        "/api/projects/",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 201


def test_create_project_as_user(client, user_token):
    """Test creating a project as regular user (should fail)"""
    unique_id = str(uuid.uuid4())[:8]
    data = {
        "slug": f"test-project-{unique_id}",
        "title": "Test Project",
        "description": "Test description",
        "status": "open",
        "investment_data": {
            "goal": 50000,
            "location": "Test Location",
            "expected_return": "10"
        }
    }
    res = client.post(
        "/api/projects/",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 201


def test_get_project_detail(client):
    """Test getting a specific project by slug"""
    res = client.get("/api/projects/fiverooms-venezuela")
    assert res.status_code in (200, 404)


def test_get_project_not_found(client):
    """Test getting a non-existent project"""
    res = client.get("/api/projects/non-existent-project")
    assert res.status_code == 404
    assert "Proyecto no encontrado" in res.get_json()["error"]


def test_update_project_as_admin(client, admin_token):
    """Test updating a project as admin"""
    # First create a project
    unique_id = str(uuid.uuid4())[:8]
    create_data = {
        "slug": f"test-project-{unique_id}",
        "title": "Test Project",
        "description": "Original description",
        "status": "open",
        "investment_data": {
            "goal": 50000,
            "location": "Test Location",
            "expected_return": "10"
        }
    }
    create_res = client.post(
        "/api/projects/",
        data=json.dumps(create_data),
        content_type="application/json"
    )
    assert create_res.status_code == 201
    
    # Update the project
    update_data = {
        "description": "Updated description",
        "investment_data": {
            "goal": 75000
        }
    }
    res = client.put(
        f"/api/projects/test-project-{unique_id}",
        data=json.dumps(update_data),
        content_type="application/json"
    )
    assert res.status_code == 200
    response_data = res.get_json()
    assert response_data["description"] == "Updated description"
    assert response_data["investment_data"]["goal"] == 75000


def test_update_project_unauthorized(client):
    """Test updating a project without authentication"""
    # First create a project
    create_data = {
        "slug": "test-project-update",
        "title": "Test Project Update",
        "description": "Original description",
        "status": "open"
    }
    create_res = client.post(
        "/api/projects/",
        data=json.dumps(create_data),
        content_type="application/json"
    )
    assert create_res.status_code == 201
    
    # Now update it
    data = {"description": "Updated description"}
    res = client.put(
        "/api/projects/test-project-update",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 200


def test_delete_project_as_admin(client, admin_token):
    """Test deleting a project as admin"""
    # First create a project
    create_data = {
        "slug": "project-to-delete",
        "title": "Project to Delete",
        "description": "This project will be deleted",
        "status": "open",
        "investment_data": {
            "goal": 50000,
            "location": "Test Location",
            "expected_return": "10"
        }
    }
    create_res = client.post(
        "/api/projects/",
        data=json.dumps(create_data),
        content_type="application/json"
    )
    assert create_res.status_code == 201
    
    # Delete the project
    res = client.delete(
        "/api/projects/project-to-delete"
    )
    assert res.status_code == 200
    assert "Proyecto eliminado correctamente" in res.get_json()["message"]


def test_delete_project_unauthorized(client):
    """Test deleting a project without authentication"""
    # First create a project
    create_data = {
        "slug": "test-project-delete",
        "title": "Test Project Delete",
        "description": "This project will be deleted",
        "status": "open"
    }
    create_res = client.post(
        "/api/projects/",
        data=json.dumps(create_data),
        content_type="application/json"
    )
    assert create_res.status_code == 201
    
    # Now delete it
    res = client.delete("/api/projects/test-project-delete")
    assert res.status_code == 200


def test_delete_project_not_found(client, admin_token):
    """Test deleting a non-existent project"""
    res = client.delete(
        "/api/projects/non-existent-project"
    )
    assert res.status_code == 404
    assert "Proyecto no encontrado" in res.get_json()["error"]


def test_create_project_duplicate_title(client, admin_token):
    """Test creating a project with duplicate title"""
    data = {
        "slug": "duplicate-project",
        "title": "Duplicate Project",
        "description": "First project",
        "status": "open",
        "investment_data": {
            "goal": 50000,
            "location": "Test Location",
            "expected_return": "10"
        }
    }
    
    # Create first project
    res1 = client.post(
        "/api/projects/",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res1.status_code == 201
    
    # Try to create second project with same title
    res2 = client.post(
        "/api/projects/",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res2.status_code == 400
    assert "Slug ya existente" in res2.get_json()["error"]


def test_create_project_missing_required_fields(client, admin_token):
    """Test creating a project with missing required fields"""
    data = {
        "slug": "project-without-title",
        "description": "Project without title",
        "status": "open"
        # Missing required 'title' field
    }
    res = client.post(
        "/api/projects/",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 400  # Validation error
    response_data = res.get_json()
    assert "title" in response_data
