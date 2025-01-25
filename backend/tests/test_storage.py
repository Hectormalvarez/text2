import pytest
from storage import Storage, InMemoryStorage  # InMemoryStorage doesn't exist yet
from models import Snippet

@pytest.fixture
def in_memory_storage():
    return InMemoryStorage()

def test_in_memory_storage_implements_interface():
    assert issubclass(InMemoryStorage, Storage)

def test_create_snippet(in_memory_storage):
    snippet = Snippet(text="Test snippet")
    snippet_id = in_memory_storage.create_snippet(snippet)
    assert snippet_id is not None
    assert in_memory_storage.snippets[snippet_id] == snippet

def test_get_snippet(in_memory_storage):
    snippet = Snippet(text="Test snippet")
    snippet_id = in_memory_storage.create_snippet(snippet)
    retrieved_snippet = in_memory_storage.get_snippet(snippet_id)
    assert retrieved_snippet == snippet

def test_get_snippet_not_found(in_memory_storage):
    retrieved_snippet = in_memory_storage.get_snippet("nonexistent_id")
    assert retrieved_snippet is None

def test_delete_snippet(in_memory_storage):
    snippet = Snippet(text="Test snippet")
    snippet_id = in_memory_storage.create_snippet(snippet)
    in_memory_storage.delete_snippet(snippet_id)
    assert snippet_id not in in_memory_storage.snippets

def test_delete_snippet_not_found(in_memory_storage):
    # Deleting a nonexistent snippet should not raise an error
    in_memory_storage.delete_snippet("nonexistent_id")