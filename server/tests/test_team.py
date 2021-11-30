from .base import CustomTestClass
import json


class TestTeamPage(CustomTestClass):
    def test_pagination(self):
        response = self.client.get(self.base_url + "/api/team", params={"page": 1})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.base_url + "/api/team", params={"page": -1})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.base_url + "/api/team", params={"page": "0"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json().get("detail"), "page number can't be zero")

    def test_team_route(self):
        credentials = self.login_register_utils()
        headers = {"Authorization": f"Bearer {credentials['access_token']}"}
        data = {
            "name": "TestUser",
            "designation": "TestPosition",
            "tag_line": "Test Tag Line",
            "image_url": "https://google.com",
            "social": {
                "linkedin": "https://linkedin.com",
                "github": "https://github.com",
                "twitter": "https://twitter.com",
            },
        }
        response = self.client.post(
            self.base_url + "/api/admin/add-team", data=json.dumps(data)
        )
        self.assertEqual(response.status_code, 403)

        response = self.client.post(
            self.base_url + "/api/admin/add-team",
            data=json.dumps(data),
            headers=headers,
        )
        self.assertEqual(response.status_code, 201)

        response = self.client.get(self.base_url + "/api/team", params={"page": 1})
        self.assertEqual(response.json(), [data])
        response = self.client.get(
            self.base_url + "/api/admin/team", params={"page": 1}
        )
        self.assertEqual(response.status_code, 403)

        update_data = {
            "name": "TestUser",
            "designation": "ChangedDesignation",
            "image_url": "https://changedimage.com",
            "social": {
                "github": "https://github.com/xyz",
                "linkedin": "https://linkedin.com/xyz",
                "twitter": "https://twitter.com/xyz",
            },
        }
        response = self.client.put(
            self.base_url + "/api/admin/update-team", data=json.dumps(update_data)
        )
        self.assertEqual(response.status_code, 403)

        response = self.client.put(
            self.base_url + "/api/admin/update-team",
            data=json.dumps(update_data),
            headers=headers,
        )
        self.assertEqual(response.status_code, 400)

        update_data["id"] = self.client.get(
            self.base_url + "/api/admin/team", params={"page": 1}, headers=headers
        ).json()[0]["_id"]
        response = self.client.put(
            self.base_url + "/api/admin/update-team",
            data=json.dumps(update_data),
            headers=headers,
        )
        self.assertEqual(response.status_code, 200)

        updated_data = data.copy()
        updated_data.update(update_data)
        updated_data.pop("id")

        response = self.client.get(self.base_url + "/api/team", params={"page": 1})
        self.assertEqual(response.json(), [updated_data])

        response = self.client.delete(
            self.base_url + "/api/admin/delete-team",
            data=json.dumps({"id": update_data["id"]}),
            headers={},
        )
        self.assertEqual(response.status_code, 403)

        response = self.client.delete(
            self.base_url + "/api/admin/delete-team",
            data=json.dumps({"id": update_data["id"]}),
            headers=headers,
        )
        self.assertEqual(response.status_code, 200)
