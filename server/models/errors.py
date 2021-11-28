from server.errors import DataErrors


class AdminDoesNotExistError(DataErrors):
    def __init__(self, msg="Admin does not exist!", status_code=400) -> None:
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


class MemberExistsError(DataErrors):
    def __init__(self, msg="Team member already exists!") -> None:
        self.status_code = 409
        super().__init__(msg)


class MemberDoesNotExistError(DataErrors):
    def __init__(self, msg="Team member does not exist!") -> None:
        self.status_code = 400
        super().__init__(msg)
