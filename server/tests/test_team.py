import unittest
import requests


class TestTeamPage(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.base_url = "http://localhost:8000"

    def test_pagination(self):
        response = self.client.get(self.base_url + "/api/team", params={"page": 1})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.base_url + "/api/team", params={"page": -1})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.base_url + "/api/team", params={"page": "0"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json().get("error"), "page number can't be zero")
