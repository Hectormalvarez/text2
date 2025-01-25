import pytest
from models import Snippet

def test_snippet_creation():
    snippet = Snippet(text="Test snippet")
    assert snippet.text == "Test snippet"