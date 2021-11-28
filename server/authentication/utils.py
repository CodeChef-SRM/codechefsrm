from typing import Any, Dict
from .errors import NoTokenFound
from . import tokens


def get_token(header: Dict[str, Any]):
    if "Authorization" in header:
        return header["Authorization"]
    raise NoTokenFound()


def validate_token_type(token: str, token_type: str = "Bearer"):
    _token_type, token = token.split()
    assert _token_type == token_type, "Invalid token type"
    return token


def generate_token(payload: Dict[str, Any], **kwargs):
    return tokens.generate_key(payload=payload, **kwargs)
