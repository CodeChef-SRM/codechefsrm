from server.errors import DuplicationError


class AdminExists(DuplicationError):
    def __init__(self, msg="Admin Exists!") -> None:
        super().__init__(msg)
