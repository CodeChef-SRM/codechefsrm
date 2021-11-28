import os
from .errors import InvalidCredentials, InvalidWebhookError

from server.models import transactions
from starlette.requests import Request

from . import open_router, admin_router
from . import definitions
from .utils import throttle_wrapper
from server.authentication.utils import generate_token


@open_router.get("/team", status_code=200)
async def team(page):
    team_data = await transactions.get_team_data(page=page)
    return team_data


@throttle_wrapper(
    path="/contact-us", router=open_router, status_code=201, limit="3/minute"
)
async def contact_us(request: Request, data: definitions.ContactUsSchema):
    await transactions.insert_details(data=data)


@open_router.get("/about-us", status_code=200)
async def about_us():
    about_us_data = await transactions.get_about_us()
    return about_us_data


@open_router.get("/events", status_code=200)
async def events(page):
    events_data = await transactions.get_events(page=page)
    return events_data


@throttle_wrapper(path="/register", router=admin_router, status_code=201)
async def admin_register(request: Request, data: definitions.AdminRegisterSchema):
    web_hook = os.getenv("web_hook")
    if data.web_hook != web_hook:
        raise InvalidWebhookError()
    await transactions.insert_admin(data=data)


@throttle_wrapper(path="/login", router=admin_router, status_code=200)
async def admin_login(request: Request, data: definitions.AdminLoginSchema):
    if await transactions.verify_admin(email=data.email, password=data.password):
        return generate_token(payload={"user": data.email, "admin": True})
    raise InvalidCredentials()


@throttle_wrapper(path="/add-event", router=admin_router, status_code=201)
async def add_event(request: Request, data: definitions.EventSchema):
    await transactions.insert_event(data=data)


@throttle_wrapper(
    path="/update-event", router=admin_router, method="put", status_code=200
)
async def update_event(request: Request, data: definitions.ModifyEventSchema):
    await transactions.update_event(data=data)


@throttle_wrapper(
    path="/delete-event", router=admin_router, method="delete", status_code=200
)
async def delete_event(request: Request, data: definitions.ModifyEventSchema):
    await transactions.delete_event(data=data)


@throttle_wrapper(path="/add-team", router=admin_router, method="post", status_code=201)
async def add_team(request: Request, data: definitions.TeamSchema):
    await transactions.insert_team(data)


@throttle_wrapper(
    path="/update-team", router=admin_router, method="put", status_code=200
)
async def update_team(request: Request, data: definitions.ModifyTeamSchema):
    await transactions.update_team(data=data)


@throttle_wrapper(
    path="/delete-team", router=admin_router, method="delete", status_code=200
)
async def delete_team(request: Request, data: definitions.ModifyTeamSchema):
    await transactions.delete_team(data)
