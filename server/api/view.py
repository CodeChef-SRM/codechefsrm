import os
from .errors import InvalidCredentials, InvalidWebhookError

from server.models.transactions import (
    get_about_us,
    get_team_data,
    insert_details,
    insert_admin,
    verify_admin,
)
from starlette.requests import Request
from starlette.responses import Response

from . import open_router, admin_router
from .definitions import ContactUsSchema, AdminRegisterSchema, AdminLoginSchema
from .utils import post_wrapper
from server.authentication.utils import generate_token


@open_router.get("/team", status_code=200)
async def team(response: Response, page):
    team_data = await get_team_data(page=page)
    if isinstance(team_data, str):
        response.status_code = 400
        return {"error": team_data}
    return team_data


@post_wrapper(path="/contact-us", router=open_router, status_code=201, limit="3/minute")
async def contact_us(request: Request, data: ContactUsSchema):
    await insert_details(data=data)
    return {"success": True}


@open_router.get("/about-us", status_code=200)
async def about_us():
    data = await get_about_us()
    return data


@post_wrapper(path="/register", router=admin_router, status_code=201)
async def admin_register(request: Request, data: AdminRegisterSchema):
    web_hook = os.getenv("web_hook")
    if data.web_hook != web_hook:
        raise InvalidWebhookError()
    await insert_admin(data=data)
    return {"success": True}


@post_wrapper(path="/login", router=admin_router, status_code=200)
async def admin_login(request: Request, data: AdminLoginSchema):
    if await verify_admin(email=data.email, password=data.password):
        return generate_token(payload={"user": data.email, "admin": True})
    raise InvalidCredentials()
