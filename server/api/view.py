from fastapi import APIRouter
from starlette.requests import Request
from .definitions import ContactUsSchema

router = APIRouter()

from .utils import post_wrapper


@router.get("/team", status_code=200)
async def team():
    return {}


@post_wrapper(path="/contact-us", status_code=201, limit="3/minute")
async def contact_us(request: Request, data: ContactUsSchema):
    return data
