from server.errors import AuthenticationError


class InvalidToken(AuthenticationError):
    def __init__(self, msg="Invalid Token") -> None:
        super().__init__(msg)


class NoTokenFound(AuthenticationError):
    def __init__(self, msg="No token found") -> None:
        super().__init__(msg)
