from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from server.api.view import open_router, admin_router
from server.api.exception_handlers import (
    invalid_data_handler,
    invalid_webhook_handler,
    admin_exists_handler,
)
from server.api.limiter import limiter
from server.api.utils import process_time
from server.api.errors import InvalidWebhookError
from server.models.errors import AdminExists
from server.authentication.middleware import verify_user
from dotenv import load_dotenv


__version__ = "0.1.0"
__title__ = "CodeChef SRM Student Chapter"

load_dotenv()

application = FastAPI()

application.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

application.middleware("http")(verify_user)

application.state.limiter = limiter
application.exception_handler(RequestValidationError)(invalid_data_handler)
application.exception_handler(InvalidWebhookError)(invalid_webhook_handler)
application.exception_handler(AdminExists)(admin_exists_handler)
application.include_router(open_router, prefix="/api")
application.include_router(admin_router, prefix="/api/admin")


@application.get("/health-check", status_code=200)
async def health_check():
    uptime = await process_time()
    return {"upTime": uptime}
