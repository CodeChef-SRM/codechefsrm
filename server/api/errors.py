from server.errors import AuthenticationError


class InvalidWebhookError(AuthenticationError):
    def __init__(self, msg="Invalid WebHook") -> None:
        super().__init__(msg)
