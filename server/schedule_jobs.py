from typing import Callable, List
import schedule
from dotenv import load_dotenv
import os
import requests
import sys

load_dotenv()


def email_logs(
    admins: List[str],
    file_name: str,
    file_path: str,
    error: bool = False,
    message: str = None,
):
    if not error:
        data = {
            "from": "CodeChef SRM <codechefsrm@gmail.com>",
            "to": admins,
            "subject": "Admin Logs",
        }
        files = ([("attachment", (file_name, open(file_path, "rb").read()))],)
    else:
        data = {
            "from": "CodeChef SRM <codechefsrm@gmail.com>",
            "to": admins,
            "subject": "Error Occurred",
            "text": message,
        }
        files = None
    requests.post(
        url=os.getenv("base_url"),
        auth=("api", os.getenv("sending_keys")),
        data=data,
        files=files,
    )


def run(day: str, time: str, func: Callable, *args, **kwargs):
    if not os.path.exists(kwargs.get("file_path")):
        func(
            error=True,
            message="Log File Not Found",
            file_name=None,
            file_path=None,
            admins=kwargs.get("admins"),
        )
        sys.exit(0)
    _day = getattr(schedule.every(), day)
    _day.at(time).do(func, *args, **kwargs)
    while True:
        schedule.run_pending()


if __name__ == "__main__":
    run(
        day="monday",
        time="10:30",
        func=email_logs,
        admins=os.getenv("admins").split(","),
        file_name="Logs",
        file_path="../admin.log",
    )
