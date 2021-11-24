import json
from hashlib import sha256
from typing import Dict

from bson import json_util
from pydantic.main import BaseModel
from server.models.errors import AdminDoesNotExistError

from . import model
from .utils import pagination_helper


async def get_team_data(page, limit: int = 10):
    skip = pagination_helper(page, limit)
    return json.loads(json_util.dumps(model.team_data(skip=skip, limit=limit)))


async def insert_details(data: BaseModel):
    data = dict(data)
    model.insert_contact_details(data=data)


async def get_about_us():
    return json.loads(json_util.dumps(model.about_us()))


async def get_events(page, limit: int = 10):
    skip = pagination_helper(page, limit)
    return json.loads(json_util.dumps(model.events_data(skip=skip, limit=limit)))


async def insert_admin(data: Dict[str, str]):
    data = dict(data)
    data["password"] = sha256(data["password"].encode()).hexdigest()
    model.admin_register(data)


async def verify_admin(email: str, password: str):
    if admin := model.admin_from_email(email=email):
        if admin["password"] == sha256(password.encode()).hexdigest():
            return True
        else:
            return False
    raise AdminDoesNotExistError(msg="Invalid email Id", status_code=403)
