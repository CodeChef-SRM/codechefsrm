from typing import Callable, List
import schedule
from dotenv import load_dotenv
import os
import requests

load_dotenv()


def email_logs(admins: List[str], file_name: str, file_path: str):
    data = {
        "from": "CodeChef SRM <codechefsrm@gmail.com>",
        "to": admins,
        "subject": "Admin Logs",
    }
    requests.post(
        url=os.getenv("base_url"),
        auth=("api", os.getenv("sending_keys")),
        data=data,
        files=[("attachment", (file_name, open(file_path, "rb").read()))],
    )


def run(day: str, time: str, func: Callable, *args, **kwargs):
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
