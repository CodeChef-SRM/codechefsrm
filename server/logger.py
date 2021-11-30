import logging
from typing import Optional


def get_logger(
    name: str, log_file: Optional[str] = "./admin.log", level: Optional[int] = 10
):
    logger = logging.getLogger(name)
    fh = logging.FileHandler(log_file)
    fh.setLevel(level)
    logger.addHandler(fh)
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    fh.setFormatter(formatter)

    return logger
