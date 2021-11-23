from typing import Callable
from starlette.requests import Request
from starlette.responses import Response

from .errors import NoTokenFound
from . import tokens
from .utils import get_token, validate_token_type


async def verify_user(request: Request, call_next: Callable):
    if "/api/admin" in str(request.url):
        try:
            token_details = get_token(request.headers)
            token = validate_token_type(token_details, "Bearer")
        except (ValueError, AssertionError, NoTokenFound) as e:
            return Response(str(e), status_code=403)
        value = tokens.verify_key(token)
        if isinstance(value, str):
            return Response(str(value), status_code=403)
        request.state.user = value
    return await call_next(request)
