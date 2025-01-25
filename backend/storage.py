from abc import ABC, abstractmethod
from models import Snippet

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