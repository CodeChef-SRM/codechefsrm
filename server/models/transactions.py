from pydantic.main import BaseModel
from . import model
from bson import json_util
import json
from typing import Dict


def get_team_data(page, limit: int = 10):
    try:
        page = int(page)
    except ValueError as e:
        return str(e)

    skip = (limit * page) - limit
    return json.loads(json_util.dumps(model.get_team(skip=skip, limit=limit)))


def insert_details(data: BaseModel):
    """Convert BaseModel object to dictionary

    Args:
        data (BaseModel): User data
    """
    model.insert_contact_details(data=data.dict())
