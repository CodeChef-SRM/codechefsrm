from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import Response
from .definitions import ContactUsSchema
from server.models.transactions import get_team_data
from models.transactions import insert_details

router = APIRouter()

from .utils import post_wrapper


@router.get("/team", status_code=200)
async def team(response: Response, page):
    team_data = get_team_data(page=page)
    if isinstance(team_data, str):
        response.status_code = 400
        return {"error": team_data}
    return team_data


@post_wrapper(path="/contact-us", status_code=201, limit="3/minute")
async def contact_us(request: Request, data: ContactUsSchema):
    insert_details(data=data)
    return {"success": True}
