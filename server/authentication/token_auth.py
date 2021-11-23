import os
from datetime import datetime, timedelta
from typing import Dict, Union

import jwt
from dotenv import load_dotenv

load_dotenv()


class TokenAuth:
    def __init__(self):
        self.signature = "random" if os.getenv("CI") else os.getenv("secret_key")

    def generate_key(
        self,
        payload: Dict[str, Union[str, int]],
        expiry: int = 1,
        get_refresh: bool = False,
        **kwargs,
    ):

        current_time = datetime.utcnow()
        payload["exp"] = current_time + timedelta(hours=expiry)
        access_token = jwt.encode(payload, key=self.signature)

        if get_refresh:
            payload["exp"] = current_time + timedelta(
                hours=kwargs.get("refresh_exipry", 1)
            )
            refresh_payload = {**{"refresh": True}, **payload}
            refresh_token = jwt.encode(refresh_payload, key=self.signature)
            return {"access_token": access_token, "refresh_token": refresh_token}

        return {"access_token": access_token}

    def verify_key(self, key: str):
        try:
            key = jwt.decode(
                jwt=key.encode(),
                key=self.signature,
                options={"verify_exp": True, "verify_signature": True},
                algorithms=["HS256"],
            )
        except jwt.exceptions.InvalidTokenError as e:
            return str(e)
        return key
