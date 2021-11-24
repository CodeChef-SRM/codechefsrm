from .model import Model
import os
from dotenv import load_dotenv

load_dotenv()

model = Model(
    mongo_uri=os.getenv("mongo_uri"),
    database=os.getenv("database"),
    web_hook=os.getenv("web_hook"),
)
