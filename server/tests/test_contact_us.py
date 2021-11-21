import unittest
import requests
import json


class TestContactUs(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = requests.Session()
        cls.base_url = "http://localhost:8000"

    def test_contact_us(self):
        response = self.client.post(
            self.base_url + "/api/contact-us",
            data=json.dumps(
                {
                    "name": "Test",
                    "email": "testuser@example.com",
                    "query": "This is a test query blah blah blah blah blah blah blah blah blah blah blah blah blah",
                }
            ),
        )

        self.assertEqual(response.status_code, 201)

    def test_contact_us_throttle(self):
        for idx, _ in enumerate(range(10), start=1):
            response = self.client.post(
                self.base_url + "/api/contact-us",
                data=json.dumps(
                    {
                        "name": "Test",
                        "email": "testuser@example.com",
                        "query": "This is a test query blah blah blah blah blah blah blah blah blah blah blah blah blah",
                    }
                ),
            )
            if idx == 8:
                self.assertEqual(response.status_code, 429)
