from .base import CustomTestClass


class TestTeamPage(CustomTestClass):
    def test_pagination(self):
        response = self.client.get(self.base_url + "/api/team", params={"page": 1})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.base_url + "/api/team", params={"page": -1})
        self.assertEqual(response.status_code, 200)

        response = self.client.get(self.base_url + "/api/team", params={"page": "0"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json().get("detail"), "page number can't be zero")
