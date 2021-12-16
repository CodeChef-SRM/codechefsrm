import json
from hashlib import sha256
from server.api import definitions

from bson import json_util
from pydantic.main import BaseModel

from . import model
from .utils import pagination_helper


async def get_team_data(page, limit: int = 10, id: bool = False):
    skip = pagination_helper(page, limit)
    return json.loads(json_util.dumps(model.team_data(skip=skip, limit=limit, id=id)))


async def insert_details(data: BaseModel):
    data = dict(data)
    model.insert_contact_details(data=data)


async def get_about_us():
    return json.loads(json_util.dumps(model.about_us()))


async def get_events(page, limit: int = 10, id: bool = False):
    skip = pagination_helper(page, limit)
    return json.loads(json_util.dumps(model.events_data(skip=skip, limit=limit, id=id)))


async def insert_admin(data: definitions.BaseSchema):
    data = dict(data)
    data["password"] = sha256(data["password"].encode()).hexdigest()
    model.admin_register(data)


async def verify_admin(email: str, password: str):
    admin = model.admin_from_email(email=email)
    if admin["password"] == sha256(password.encode()).hexdigest():
        return admin["name"]
    return False


async def insert_event(data: definitions.BaseSchema):
    data = dict(data)
    model.insert_event_data(data=data)


async def update_event(data: definitions.BaseSchema):
    data = dict(data)
    return model.update_event_data(data=data)


async def delete_event(data: definitions.BaseSchema):
    _id = data.id
    return model.delete_event_data(_id=_id)


async def insert_team(data: definitions.BaseSchema):
    data = dict(data)
    model.insert_team_data(data)


async def update_team(data: definitions.BaseSchema):
    data = dict(data)
    return model.update_team_data(data)


async def delete_team(data: definitions.BaseSchema):
    _id = data.id
    return model.delete_team_data(_id=_id)


async def insert_about_us(data: definitions.BaseSchema):
    data = data.about_us
    return model.add_about_us(data=data)
