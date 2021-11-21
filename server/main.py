from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from server.api.view import router as api_view
from server.api.exception_handlers import invalid_data_handler
from server.api.limiter import limiter

__version__ = "0.1.0"

application = FastAPI()

application.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

application.state.limiter = limiter
application.exception_handler(RequestValidationError)(invalid_data_handler)
application.include_router(api_view, prefix="/api")
