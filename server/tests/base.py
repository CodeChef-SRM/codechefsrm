import unittest
import requests
import pymongo
import os
import json
from dotenv import load_dotenv

load_dotenv()

db = pymongo.MongoClient(os.getenv("mongo_uri"))[os.getenv("database")]


def drop_collections():
    db.drop_collection("Admin")
    db.drop_collection("ContactUs")
    db.drop_collection("Events")
    db.drop_collection("Team")


class CustomTestClass(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.base_url = "http://localhost:8000"
        if os.getenv("database") == "test-db":
            print(f"DROPPING COLLECTIONS OF DB {os.getenv('database')}")
            drop_collections()

    @classmethod
    def tearDownClass(cls) -> None:
        if os.getenv("database") == "test-db":
            print(f"DROPPING COLLECTIONS OF DB {os.getenv('database')}")
            drop_collections()

    def login_register_utils(self):
        data = {
            "name": "TestUser",
            "email": "TestUser@example.com",
            "password": "TestPassword",
            "web_hook": os.getenv("web_hook"),
        }

        response = self.client.post(
            self.base_url + "/api/admin/register", data=json.dumps(data)
        )

        data.pop("name")
        data.pop("web_hook")
        login_response = self.client.post(
            self.base_url + "/api/admin/login", data=json.dumps(data)
        )

        return login_response.json()
