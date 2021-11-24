import time
import os
from typing import Callable
from psutil import Process
from .limiter import limiter


def throttle_wrapper(
    path: str,
    router,
    method: str = "post",
    status_code: int = 201,
    limit: str = "5/minute",
    **kwargs
):
    """Wrapper function for simplifying router args and throttling

    Args:
        path (str): route
        status_code (int, optional): Status code returned. Defaults to 201.
        limit (str, optional): Throttle details. Defaults to "5/minute".
    """
    if os.getenv("CI"):
        limit = "1000/minute"

    def inner(func: Callable):
        func = getattr(router, method)(path, status_code=status_code, **kwargs)(
            limiter.limit(limit)(func)
        )
        return func

    return inner


async def process_time():
    return time.time() - Process(os.getpid()).create_time()
