from .base import CustomTestClass


class TestMe(CustomTestClass):
    def test_me(self):
        response = self.client.get(self.base_url + "/me")
        self.assertEqual(response.status_code, 403)

        creds = self.login_register_utils()["access_token"]
        response = self.client.get(
            self.base_url + "/me", headers={"Authorization": f"Bearer {creds}"}
        )
        self.assertEqual(response.status_code, 200)
