from pydantic.main import BaseModel
from . import model
from bson import json_util
import json


def get_team_data(page, limit: int = 10):
    try:
        page = abs(int(page))
        assert page != 0, "page number can't be zero"
    except (ValueError, AssertionError) as e:
        return str(e)

    skip = (limit * page) - limit
    return json.loads(json_util.dumps(model.get_team(skip=skip, limit=limit)))


def insert_details(data: BaseModel):
    """Convert BaseModel object to dictionary

    Args:
        data (BaseModel): User data
    """
    model.insert_contact_details(data=data.dict())
