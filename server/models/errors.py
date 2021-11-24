from server.errors import DataErrors


class AdminDoesNotExistError(DataErrors):
    def __init__(self, msg="Admin does not exist!", status_code=400) -> None:
        self.status_code = status_code
        super().__init__(msg)


class AdminExistsError(DataErrors):
    def __init__(self, msg="Admin exist!") -> None:
        self.status_code = 409
        super().__init__(msg)
