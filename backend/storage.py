from abc import ABC, abstractmethod
from models import Snippet

import uuid


class Storage(ABC):
    @abstractmethod
    def create_snippet(self, snippet: Snippet) -> str:
        pass

    @abstractmethod
    def get_snippet(self, snippet_id: str) -> Snippet | None:
        pass

    @abstractmethod
    def delete_snippet(self, snippet_id: str) -> None:
        pass


class InMemoryStorage(Storage):
    def __init__(self):
        self.snippets = {}

    def create_snippet(self, snippet: Snippet) -> str:
        """Creates a new snippet and returns the ID"""
        snippet_id = str(uuid.uuid4())[:6]
        self.snippets[snippet_id] = snippet
        return snippet_id

    def get_snippet(self, snippet_id: str) -> Snippet | None:
        """Retreives a snippet by its ID."""
        return self.snippets.get(snippet_id)

    def delete_snippet(self, snippet_id: str) -> None:
        """Deletes a snippet by its ID."""
        if snippet_id in self.snippets:
            del self.snippets[snippet_id]
