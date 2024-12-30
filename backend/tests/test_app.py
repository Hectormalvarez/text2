from app import app


def test_hello_world():
    with app.test_client() as client:
        response = client.get("/")
        assert response.status_code == 200
        assert b"Hello, World!" in response.data


def test_create_snippet():
    with app.test_client() as client:
        # Test with valid data
        data = {"text": "This is a test snippet."}
        response = client.post("/snippets", json=data)
        assert response.status_code == 201
        assert "id" in response.json

        # Test with missing data
        response = client.post("/snippets", json={})
        assert response.status_code == 400

        # Test with invalid data (e.g., non-string text)
        data = {"text": 123}
        response = client.post("/snippets", json=data)
        assert response.status_code == 400
