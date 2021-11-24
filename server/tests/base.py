import unittest
import requests
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

db = pymongo.MongoClient(os.getenv("mongo_uri"))[os.getenv("database")]


class CustomTestClass(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.base_url = "http://localhost:8000"

    @classmethod
    def tearDownClass(cls) -> None:
        if os.getenv("database") == "test-db":
            db.drop_collection("Admin")
            db.drop_collection("ContactUs")
