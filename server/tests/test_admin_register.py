from .base import CustomTestClass
import json
import os


class TestAdminRegister(CustomTestClass):
    data = {
        "name": "TestUser",
        "email": "TestUser@example.com",
        "web_hook": os.getenv("web_hook"),
    }

    def test_register(self):
        response = self.client.post(
            self.base_url + "/api/admin/register", data=json.dumps(self.data)
        )
        self.assertEqual(response.status_code, 201)
        response = self.client.post(
            self.base_url + "/api/admin/register", data=json.dumps(self.data)
        )

        self.assertEqual(response.status_code, 409)
        data = self.data.copy()
        data["web_hook"] = "invalidwebhook"
        response = self.client.post(
            self.base_url + "/api/admin/register", data=json.dumps(data)
        )
        self.assertEqual(response.status_code, 403)

    def test_register_schema(self):
        data = self.data.copy()
        data["email"] = "invalidemail"
        response = self.client.post(
            self.base_url + "/api/admin/register", data=json.dumps(data)
        )
        self.assertEqual(response.status_code, 400)
