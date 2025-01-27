import pytest
from app import app
from models import Snippet


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def mock_storage(mocker):
    mock_storage = mocker.MagicMock()
    # Patch the storage instance
    mocker.patch("app.storage", wraps=mock_storage)
    return mock_storage


@pytest.fixture
def mock_snippet(mocker):
    mock = mocker.MagicMock()
    mocker.patch("app.Snippet", mock)
    return mock


def test_hello_world(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"Hello, World!" in response.data


def test_create_snippet_valid_data(client, mock_storage, mock_snippet):
    mock_storage.create_snippet.return_value = "test_id"
    data = {"text": "This is a test snippet."}
    response = client.post("/snippets", json=data)
    assert response.status_code == 201
    assert response.json["id"] == "test_id"
    mock_snippet.assert_called_once_with(text="This is a test snippet.")
    mock_storage.create_snippet.assert_called_once_with(mock_snippet.return_value)


def test_create_snippet_missing_data(client, mock_storage):
    response = client.post("/snippets", json={})
    assert response.status_code == 400


def test_create_snippet_invalid_data(client, mock_storage):
    response = client.post("/snippets", json={"text": 123})
    assert response.status_code == 400


def test_get_snippet_valid_id(client, mock_storage):
    mock_storage.get_snippet.return_value = Snippet(text="Test snippet")
    response = client.get("/snippets/test_id")
    assert response.status_code == 200
    assert response.json["text"] == "Test snippet"
    mock_storage.get_snippet.assert_called_once_with("test_id")


def test_get_snippet_invalid_id(client, mock_storage):
    mock_storage.get_snippet.return_value = None
    response = client.get("/snippets/invalid_id")
    assert response.status_code == 404


def test_delete_snippet_valid_id(client, mock_storage):
    response = client.delete("/snippets/test_id")
    assert response.status_code == 200
    mock_storage.delete_snippet.assert_called_once_with("test_id")


def test_delete_snippet_invalid_id(client, mock_storage):
    response = client.delete("/snippets/invalid_id")
    assert (
        response.status_code == 200
    )  # Assuming deleting a non-existent snippet still returns 200
