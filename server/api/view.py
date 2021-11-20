from re import L
from fastapi import APIRouter
from starlette.responses import Response
from .definitions import ContactUsSchema

router = APIRouter()


@router.get("/team", status_code=200)
async def team(response: Response):
    return {}


@router.post("/contact-us", status_code=201)
async def contact_us(data: ContactUsSchema, response: Response):
    return data
