from flask import Flask, request, jsonify

from models import Snippet
from storage import Storage, InMemoryStorage

app = Flask(__name__)

# Initialize the storage instance
storage: Storage = InMemoryStorage()


def get_storage() -> Storage:
    """Returns the storage instance."""
    return storage


@app.route("/")
def hello_world():
    """Simple hello world endpoint."""
    return "Hello, World!"


@app.route("/snippets", methods=["POST"])
def create_snippet():
    """Creates a new snippet."""
    data = request.get_json()
    if not data or "text" not in data or not isinstance(data["text"], str):
        return jsonify({"error": "Invalid request data"}), 400

    snippet = Snippet(text=data["text"])
    snippet_id = get_storage().create_snippet(snippet)
    return jsonify({"id": snippet_id}), 201


@app.route("/snippets/<snippet_id>", methods=["GET"])
def get_snippet(snippet_id):
    """Retrieves a snippet by ID."""
    snippet = get_storage().get_snippet(snippet_id)
    if snippet is None:
        return jsonify({"error": "Snippet not found"}), 404
    return jsonify({"text": snippet.text}), 200


@app.route("/snippets", methods=["GET"])
def get_snippets():
    """Retrieves all snippets."""
    all_snippets = get_storage().snippets
    return jsonify({"data": all_snippets})


@app.route("/snippets/<snippet_id>", methods=["DELETE"])
def delete_snippet(snippet_id):
    """Deletes a snippet by ID."""
    get_storage().delete_snippet(snippet_id)
    return jsonify({"message": "Snippet was successfully deleted"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
