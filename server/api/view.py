import os
from .errors import InvalidCredentials, InvalidWebhookError

from server.models import transactions
from starlette.requests import Request

from . import definitions, open_router, admin_router, admin_logger
from .utils import throttle_wrapper
from server.authentication.utils import generate_token, refresh_to_access


@open_router.get("/team", status_code=200)
async def team(page):
    team_data = await transactions.get_team_data(page=page)
    return team_data


@throttle_wrapper(
    path="/contact-us", router=open_router, status_code=201, limit="3/minute"
)
async def contact_us(request: Request, data: definitions.ContactUsSchema):
    await transactions.insert_details(data=data)
    return {"success": True}


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
    admin_logger.warning(f"Admin Registered {data.name, data.email}")
    return {"success": True}


@throttle_wrapper(path="/login", router=admin_router, status_code=200)
async def admin_login(request: Request, data: definitions.AdminLoginSchema):
    if name := await transactions.verify_admin(
        email=data.email, password=data.password
    ):
        return generate_token(
            payload={"user_name": name, "user_email": data.email, "admin": True},
            get_refresh=True,
        )
    raise InvalidCredentials()


@admin_router.get("/team", status_code=200)
async def admin_team(page):
    return await transactions.get_team_data(page=page, id=True)


@admin_router.get("/events", status_code=200)
async def admin_events(page):
    return await transactions.get_events(page=page, id=True)


@throttle_wrapper(path="/about-us", router=admin_router, status_code=201)
async def admin_about_us(request: Request, data: definitions.AboutUsSchema):
    admin_logger.warning(f"{request.state.user['user_name']} Updated About Us: {data}")
    await transactions.insert_about_us(data=data)
    return {"success": True}


@throttle_wrapper(path="/add-event", router=admin_router, status_code=201)
async def add_event(request: Request, data: definitions.EventSchema):
    await transactions.insert_event(data=data)
    admin_logger.warning(
        f"{request.state.user['user_name']} Added new event: {data.event_name}"
    )
    return {"success": True}


@throttle_wrapper(
    path="/update-event", router=admin_router, method="put", status_code=200
)
async def update_event(request: Request, data: definitions.ModifyEventSchema):
    event_name = await transactions.update_event(data=data)
    admin_logger.warning(
        f"{request.state.user['user_name']} Updated Event: {event_name}"
    )
    return {"success": True}


@throttle_wrapper(
    path="/delete-event", router=admin_router, method="delete", status_code=200
)
async def delete_event(request: Request, data: definitions.ModifyEventSchema):
    event_name = await transactions.delete_event(data=data)
    admin_logger.critical(
        f"{request.state.user['user_name']} Deleted Event: {event_name}"
    )
    return {"success": True}


@throttle_wrapper(path="/add-team", router=admin_router, method="post", status_code=201)
async def add_team(request: Request, data: definitions.TeamSchema):
    await transactions.insert_team(data)
    admin_logger.warning(f"{request.state.user['user_name']} Added Member: {data.name}")
    return {"success": True}


@throttle_wrapper(
    path="/update-team", router=admin_router, method="put", status_code=200
)
async def update_team(request: Request, data: definitions.ModifyTeamSchema):
    member = await transactions.update_team(data=data)
    admin_logger.warning(
        f"{request.state.user['user_name']} Updated member details: {member}"
    )
    return {"success": True}


@throttle_wrapper(
    path="/delete-team", router=admin_router, method="delete", status_code=200
)
async def delete_team(request: Request, data: definitions.ModifyTeamSchema):
    member = await transactions.delete_team(data)
    admin_logger.critical(f"{request.state.user['user_name']} Deleted Member: {member}")
    return {"success": True}


@admin_router.get("/refresh-token", status_code=200)
async def refresh_token(request: Request):
    return await refresh_to_access(request.state.user["token"])
