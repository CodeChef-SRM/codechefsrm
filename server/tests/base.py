import unittest
import requests


class CustomTestClass(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.base_url = "http://localhost:8000"
