from typing import Any, Dict

from .errors import NoTokenFound, InvalidToken
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


async def refresh_to_access(token: str):
    payload = tokens.verify_key(token)
    if payload.get("refresh"):
        payload.pop("refresh")
        return tokens.generate_key(payload, get_refresh=True)
    raise InvalidToken("Invalid refresh token")
