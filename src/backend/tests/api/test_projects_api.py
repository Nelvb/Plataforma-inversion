import json
import pytest
from app.models.project import Project


def test_get_projects(client):
    """Test getting all projects"""
    res = client.get("/api/projects")
    assert res.status_code == 200
    assert isinstance(res.get_json(), list)


def test_get_projects_empty(client):
    """Test getting projects when none exist"""
    res = client.get("/api/projects")
    assert res.status_code == 200
    assert res.get_json() == []


def test_create_project_as_admin(client, admin_token):
    """Test creating a project as admin"""
    data = {
        "title": "FiveRooms Venezuela",
        "description": "Proyecto de alquiler por habitaciones",
        "investment_goal": 110000,
        "location": "Valladolid",
        "expected_return": "12"
    }
    res = client.post(
        "/api/projects",
        headers={"Authorization": f"Bearer {admin_token}"},
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
        "title": "Test Project",
        "description": "Test description",
        "investment_goal": 50000,
        "location": "Test Location",
        "expected_return": "10"
    }
    res = client.post(
        "/api/projects",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 401


def test_create_project_as_user(client, user_token):
    """Test creating a project as regular user (should fail)"""
    data = {
        "title": "Test Project",
        "description": "Test description",
        "investment_goal": 50000,
        "location": "Test Location",
        "expected_return": "10"
    }
    res = client.post(
        "/api/projects",
        headers={"Authorization": f"Bearer {user_token}"},
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 403


def test_get_project_detail(client):
    """Test getting a specific project by slug"""
    res = client.get("/api/projects/fiverooms-venezuela")
    assert res.status_code in (200, 404)


def test_get_project_not_found(client):
    """Test getting a non-existent project"""
    res = client.get("/api/projects/non-existent-project")
    assert res.status_code == 404
    assert "Project not found" in res.get_json()["error"]


def test_update_project_as_admin(client, admin_token):
    """Test updating a project as admin"""
    # First create a project
    create_data = {
        "title": "Test Project",
        "description": "Original description",
        "investment_goal": 50000,
        "location": "Test Location",
        "expected_return": "10"
    }
    create_res = client.post(
        "/api/projects",
        headers={"Authorization": f"Bearer {admin_token}"},
        data=json.dumps(create_data),
        content_type="application/json"
    )
    assert create_res.status_code == 201
    
    # Update the project
    update_data = {
        "description": "Updated description",
        "investment_goal": 75000
    }
    res = client.put(
        "/api/projects/test-project",
        headers={"Authorization": f"Bearer {admin_token}"},
        data=json.dumps(update_data),
        content_type="application/json"
    )
    assert res.status_code == 200
    response_data = res.get_json()
    assert response_data["description"] == "Updated description"
    assert response_data["investment_goal"] == 75000


def test_update_project_unauthorized(client):
    """Test updating a project without authentication"""
    data = {"description": "Updated description"}
    res = client.put(
        "/api/projects/test-project",
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 401


def test_delete_project_as_admin(client, admin_token):
    """Test deleting a project as admin"""
    # First create a project
    create_data = {
        "title": "Project to Delete",
        "description": "This project will be deleted",
        "investment_goal": 50000,
        "location": "Test Location",
        "expected_return": "10"
    }
    create_res = client.post(
        "/api/projects",
        headers={"Authorization": f"Bearer {admin_token}"},
        data=json.dumps(create_data),
        content_type="application/json"
    )
    assert create_res.status_code == 201
    
    # Delete the project
    res = client.delete(
        "/api/projects/project-to-delete",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert res.status_code == 200
    assert "Project deleted" in res.get_json()["message"]


def test_delete_project_unauthorized(client):
    """Test deleting a project without authentication"""
    res = client.delete("/api/projects/test-project")
    assert res.status_code == 401


def test_delete_project_not_found(client, admin_token):
    """Test deleting a non-existent project"""
    res = client.delete(
        "/api/projects/non-existent-project",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert res.status_code == 404
    assert "Project not found" in res.get_json()["error"]


def test_create_project_duplicate_title(client, admin_token):
    """Test creating a project with duplicate title"""
    data = {
        "title": "Duplicate Project",
        "description": "First project",
        "investment_goal": 50000,
        "location": "Test Location",
        "expected_return": "10"
    }
    
    # Create first project
    res1 = client.post(
        "/api/projects",
        headers={"Authorization": f"Bearer {admin_token}"},
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res1.status_code == 201
    
    # Try to create second project with same title
    res2 = client.post(
        "/api/projects",
        headers={"Authorization": f"Bearer {admin_token}"},
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res2.status_code == 400
    assert "already exists" in res2.get_json()["error"]


def test_create_project_missing_required_fields(client, admin_token):
    """Test creating a project with missing required fields"""
    data = {
        "description": "Project without title",
        "investment_goal": 50000,
        "location": "Test Location",
        "expected_return": "10"
    }
    res = client.post(
        "/api/projects",
        headers={"Authorization": f"Bearer {admin_token}"},
        data=json.dumps(data),
        content_type="application/json"
    )
    assert res.status_code == 422  # Validation error
    assert "error" in res.get_json()
