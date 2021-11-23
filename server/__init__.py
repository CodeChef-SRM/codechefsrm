from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from server.api.view import router as api_view
from server.api.exception_handlers import invalid_data_handler
from server.api.limiter import limiter
from server.api.utils import process_time
from server.authentication.middleware import verify_user

__version__ = "0.1.0"
__title__ = "CodeChef SRM Student Chapter"

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
application.include_router(api_view, prefix="/api")


@application.get("/health-check", status_code=200)
async def health_check():
    uptime = await process_time()
    return {"upTime": uptime}
