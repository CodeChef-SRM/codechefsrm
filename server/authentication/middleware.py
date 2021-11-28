from typing import Callable
from starlette.requests import Request
from starlette.responses import Response

from .errors import NoTokenFound
from . import tokens
from .utils import get_token, validate_token_type
import re


async def verify_user(request: Request, call_next: Callable):
    path = re.sub(str(request.base_url), "", str(request.url))
    _allowed_routes = ["api/admin/register", "api/admin/login"]

    if ("api/admin" in path or "me" in path) and path not in _allowed_routes:
        try:
            token_details = get_token(request.headers)
            token = validate_token_type(token_details, "Bearer")
        except (ValueError, AssertionError, NoTokenFound) as e:
            return Response("Invalid Token", status_code=403)

        value = tokens.verify_key(token)
        if isinstance(value, str):
            return Response(str(value), status_code=403)
        request.state.user = token

    return await call_next(request)
