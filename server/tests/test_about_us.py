import json

from .base import CustomTestClass


class TestAboutUs(CustomTestClass):
    def test_details(self):
        response = self.client.get(self.base_url + "/api/about-us")
        self.assertEqual(response.status_code, 200)

    def test_admin_upload(self):
        admin_creds = self.login_register_utils()["access_token"]
        headers = {"content-type": "application/json"}
        headers.update({"Authorization": "Bearer randomtoken"})
        response = self.client.post(
            self.base_url + "/api/admin/about-us",
            data=json.dumps(
                {"section_1": "some content", "section_2": "some other content"}
            ),
            headers=headers,
        )
        self.assertEqual(response.status_code, 403)

        headers.update({"Authorization": f"Bearer {admin_creds}"})
        about_us_data = {
            "about_us": {
                "section_1": "some content",
                "section_2": "some other content",
            }
        }
        response = self.client.post(
            self.base_url + "/api/admin/about-us",
            data=json.dumps(about_us_data),
            headers=headers,
        )
        self.assertEqual(response.status_code, 201)

        response = self.client.get(self.base_url + "/api/about-us")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [about_us_data["about_us"]])
