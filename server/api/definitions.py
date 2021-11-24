from pydantic import BaseModel, constr


class ContactUsSchema(BaseModel):
    class Config:
        extra = "forbid"

    name: str
    email: constr(regex="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
    query: constr(min_length=30, strip_whitespace=True)


class AdminRegisterSchema(BaseModel):
    class Config:
        extra = "forbid"

    name: str
    email: constr(regex="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
    password: constr(min_length=8)
    web_hook: constr(strip_whitespace=True)


class AdminLoginSchema(BaseModel):
    class Config:
        extra = "forbid"

    email: constr(regex="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
    password: str
