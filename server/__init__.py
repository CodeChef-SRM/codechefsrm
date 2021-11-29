from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from server.api.view import open_router, admin_router
from server.api.exception_handlers import (
    invalid_data_handler,
    auth_error_handler,
    data_error_handler,
)
from server.api.limiter import limiter
from server.api.utils import process_time
from server.errors.auth_errors import AuthenticationError
from server.errors.data_error import DataErrors
from server.authentication.middleware import verify_user
from dotenv import load_dotenv


__version__ = "0.1.0"
__title__ = "CodeChef SRM Student Chapter"

load_dotenv()

application = FastAPI(
    title=__title__,
    version=__version__,
    docs_url="/docs",
    description="API for CodeChef SRM",
    redoc_url="/redoc",
)

application.middleware("http")(verify_user)
application.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

application.state.limiter = limiter
application.exception_handler(RequestValidationError)(invalid_data_handler)
application.exception_handler(AuthenticationError)(auth_error_handler)
application.exception_handler(DataErrors)(data_error_handler)
application.include_router(open_router, prefix="/api")
application.include_router(admin_router, prefix="/api/admin")


@application.get("/health-check", status_code=200)
async def health_check():
    uptime = await process_time()
    return {"upTime": uptime}


@application.get("/me", status_code=200)
async def verify_token():
    return {"success": True}
