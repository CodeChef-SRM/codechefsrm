from .base import CustomTestClass


class TestAboutUs(CustomTestClass):
    def test_details(self):
        response = self.client.get(self.base_url + "/api/about-us")
        self.assertEqual(response.status_code, 200)
