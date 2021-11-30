from fastapi import APIRouter
from server.logger import get_logger

admin_logger = get_logger("Admin Logger")

open_router = APIRouter()
admin_router = APIRouter()
