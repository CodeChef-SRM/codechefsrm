from server.errors import DataErrors


class AdminDoesNotExistError(DataErrors):
    def __init__(self, msg="Admin does not exists!", status_code=400) -> None:
        self.status_code = status_code
        super().__init__(msg)


class AdminExistsError(DataErrors):
    def __init__(self, msg="Admin exists!") -> None:
        self.status_code = 409
        super().__init__(msg)


class EventExistsError(DataErrors):
    def __init__(self, msg="Event exists!") -> None:
        self.status_code = 409
        super().__init__(msg)


class EventDoesNotError(DataErrors):
    def __init__(self, msg="Event does not exist!") -> None:
        self.status_code = 400
        super().__init__(msg)
