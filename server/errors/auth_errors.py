class AuthenticationError(Exception):
    """Base class for authentication errors status_code=403"""

    status_code = 403
