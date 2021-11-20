from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from server.api.view import router as api_view
from server.api.exception_handlers import invalid_data_handler

__version__ = "0.1.0"

application = FastAPI()

application.exception_handler(RequestValidationError)(invalid_data_handler)
application.include_router(api_view, prefix="/api")
