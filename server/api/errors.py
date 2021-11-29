from server.errors import AuthenticationError


class InvalidWebhookError(AuthenticationError):
    def __init__(self, msg="Invalid WebHook") -> None:
        super().__init__(msg)


class InvalidCredentials(AuthenticationError):
    def __init__(self, msg="Invalid user credentials") -> None:
        super().__init__(msg)
