from .base import CustomTestClass
import os
import json


class TestAdminLogin(CustomTestClass):
    def test_admin_login(self):
        data = {
            "name": "testadmin",
            "email": "testadmin@example.com",
            "password": "testpassword",
            "web_hook": os.getenv("web_hook"),
        }
        response = self.client.post(
            self.base_url + "/api/admin/register", data=json.dumps(data)
        )
        self.assertEqual(response.status_code, 201)

        data.pop("web_hook")
        data.pop("name")
        response = self.client.post(
            self.base_url + "/api/admin/login", data=json.dumps(data)
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("access_token", response.json())
        invalid_data = data.copy()
        invalid_data["password"] = "invalid password"

        response = self.client.post(
            self.base_url + "/api/admin/login", data=json.dumps(invalid_data)
        )
        self.assertEqual(response.status_code, 403)
        invalid_data = data.copy()
        invalid_data["email"] = "wrongemail@gmail.com"

        response = self.client.post(
            self.base_url + "/api/admin/login", data=json.dumps(invalid_data)
        )
        self.assertEqual(response.status_code, 403)

        invalid_data = data.copy()
        invalid_data["email"] = "wrongemail@gmail.com"
        invalid_data["password"] = "invalid password"

        response = self.client.post(
            self.base_url + "/api/admin/login", data=json.dumps(invalid_data)
        )
        self.assertEqual(response.status_code, 403)
