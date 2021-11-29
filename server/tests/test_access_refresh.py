from .base import CustomTestClass

import json


class TestAccessRefresh(CustomTestClass):
    def test_me(self):
        credentials = self.login_register_utils()
        access_token, _ = (
            credentials["access_token"],
            credentials["refresh_token"],
        )
        headers = {"Authorization": f"Bearer {access_token}"}

        response = self.client.get(self.base_url + "/me", headers=headers)
        self.assertEqual(response.status_code, 200)

        invalid_headers = headers.copy()
        invalid_headers["Authorization"] = f"Bearer invalidtoken"
        response = self.client.get(self.base_url + "/me", headers=invalid_headers)
        self.assertEqual(response.status_code, 403)

    def test_refresh_to_access(self):
        credentials = self.login_register_utils()
        _, refresh_token = (
            credentials["access_token"],
            credentials["refresh_token"],
        )
        headers = {"Authorization": f"Bearer {refresh_token}"}

        # Refresh token to refresh route
        response = self.client.get(
            self.base_url + "/api/admin/refresh-token", headers=headers
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("access_token", response.json())
        self.assertIn("refresh_token", response.json())

        # Test access token which came from refresh-token route
        response_me = self.client.get(
            self.base_url + "/me",
            headers={"Authorization": f"Bearer {response.json()['access_token']}"},
        )
        self.assertEqual(response_me.status_code, 200)

        # Test sending access token as refresh token
        invalid_headers = headers.copy()
        invalid_headers["Authorization"] = response.json()["access_token"]
        response = self.client.get(
            self.base_url + "/api/admin/refresh-token", headers=invalid_headers
        )

        self.assertEqual(response.status_code, 403)
