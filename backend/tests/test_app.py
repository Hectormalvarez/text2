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


def test_get_snippet():
    with app.test_client() as client:
        # Create a snippet first
        data = {'text': 'Test snippet'}
        response = client.post('/snippets', json=data)
        snippet_id = response.json['id']

        # Test with a valid ID
        response = client.get(f'/snippets/{snippet_id}')
        assert response.status_code == 200
        assert response.json['text'] == 'Test snippet'

        # Test with an invalid ID
        response = client.get('/snippets/invalid_id')
        assert response.status_code == 404

def test_delete_snippet():
    with app.test_client() as client:
        # Create a snippet first
        data = {'text': 'Test snippet'}
        response = client.post('/snippets', json=data)
        snippet_id = response.json['id']

        # Test with a valid ID
        response = client.delete(f'/snippets/{snippet_id}')
        assert response.status_code == 200
        assert response.json['message'] == 'Snippet was successfully deleted'

        # Test to check if snippet is still present in memory
        response = client.get(f'/snippets/{snippet_id}')
        assert response.status_code == 404

        # Test with invalid ID
        response = client.delete(f'/snippets/invalid_id')
        assert response.status_code == 200
        assert response.json['message'] == 'Snippet was successfully deleted'
