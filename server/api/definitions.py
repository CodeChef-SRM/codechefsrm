from typing import Optional
from pydantic import BaseModel, constr


class BaseSchema(BaseModel):
    class Config:
        extra = "forbid"


class ContactUsSchema(BaseSchema):
    name: str
    email: constr(regex="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
    query: constr(min_length=30, strip_whitespace=True)


class AdminRegisterSchema(BaseSchema):
    name: str
    email: constr(regex="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
    password: constr(min_length=8)
    web_hook: constr(strip_whitespace=True)


class AdminLoginSchema(BaseSchema):
    email: constr(regex="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
    password: str


class EventSchema(BaseSchema):
    event_name: str
    event_info: constr(max_length=100, strip_whitespace=True)
    event_start_date: str
    event_end_date: str
    image_url: constr(
        regex=r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
    )


class ModifyEventSchema(BaseSchema):
    event_name: str
    event_info: Optional[constr(max_length=100, strip_whitespace=True)] = None
    event_start_date: Optional[str] = None
    event_end_date: Optional[str] = None
    image_url: Optional[
        constr(
            regex=r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
        )
    ] = None


class TeamSchema(BaseSchema):
    name: str
    designation: str
    tag_line: str
    image_url: constr(
        regex=r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
    )


class ModifyTeamSchema(BaseSchema):
    name: str
    designation: Optional[str] = None
    tag_line: Optional[str] = None
    image_url: Optional[
        constr(
            regex=r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
        )
    ] = None
