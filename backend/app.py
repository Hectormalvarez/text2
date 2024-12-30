from flask import Flask, request, jsonify
import uuid

app = Flask(__name__)

# In-memory storage for snippets
snippets = {}  

@app.route('/')
def hello_world():
    return "Hello, World!"


@app.route('/snippets', methods=['POST'])
def create_snippet():
    data = request.get_json()
    if not data or 'text' not in data or not isinstance(data['text'], str):
        return jsonify({'error': 'Invalid request data'}), 400
    snippet_id = str(uuid.uuid4())[:6]
    snippets[snippet_id] = {'text': data['text']}
    
    return jsonify({'id': snippet_id}), 201


@app.route('/snippets/<snippet_id>', methods=['GET'])
def get_snippet(snippet_id):
    if snippet_id not in snippets:
        return jsonify({'error': 'Snippet not found'}), 404
    return jsonify({'text': snippets[snippet_id]['text']}), 200


if __name__ == '__main__':
    app.run(debug=True)