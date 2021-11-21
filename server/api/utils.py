from typing import Callable
from .view import router as main_router
from .limiter import limiter


def contact_us_wrapper(
    path: str, status_code: int = 201, limit: str = "5/minute", **kwargs
):
    """Wrapper function for simplifying router args and throttling

    Args:
        path (str): route
        status_code (int, optional): Status code returned. Defaults to 201.
        limit (str, optional): Throttle details. Defaults to "5/minute".
    """

    def inner(func: Callable):
        func = main_router.post(path, status_code=status_code, **kwargs)(
            limiter.limit(limit)(func)
        )
        return func

    return inner
