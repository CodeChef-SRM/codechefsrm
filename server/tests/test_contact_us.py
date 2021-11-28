from .base import CustomTestClass
import json


class TestContactUs(CustomTestClass):
    def setUp(self) -> None:
        self.base_data = {
            "name": "Test",
            "email": "testuser@example.com",
            "query": "This is a test query blah blah blah blah blah blah blah blah blah blah blah blah blah",
        }

    def test_contact_us(self):
        response = self.client.post(
            self.base_url + "/api/contact-us",
            data=json.dumps(self.base_data),
        )

        self.assertEqual(response.status_code, 201)

    def test_invalid_data(self):
        data = self.base_data.copy()
        data.update({"extra_field": True})
        response = self.client.post(self.base_url + "/api/contact-us", data=data)
        self.assertEqual(response.status_code, 400)

        data = self.base_data.copy()
        data["email"] = "invalidaddr@123"
        response = self.client.post(self.base_url + "/api/contact-us", data=data)
        self.assertEqual(response.status_code, 400)
