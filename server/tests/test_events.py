from .base import CustomTestClass
import json


class TestEventsData(CustomTestClass):
    data = {
        "event_name": "Test Event",
        "event_info": "This event is ment for blah blah blah blahblah blah \
            bashablah blah blah blah",
        "image_url": "https://google.com",
        "event_start_date": "29/09/2020",
        "event_end_date": "30/11/2020",
    }

    def test_protected_route(self):
        response = self.client.post(
            self.base_url + "/api/admin/add-event", data=json.dumps(self.data)
        )
        self.assertEqual(response.status_code, 403)

        response = self.client.put(
            self.base_url + "/api/admin/update-event", data=json.dumps(self.data)
        )
        self.assertEqual(response.status_code, 403)

    def test_event_route(self):
        credentials = self.login_register_utils()
        headers = {"Authorization": f"Bearer {credentials['access_token']}"}
        response = self.client.post(
            self.base_url + "/api/admin/add-event",
            data=json.dumps(self.data),
            headers=headers,
        )
        self.assertEqual(response.status_code, 201)

        response = self.client.get(self.base_url + "/api/events", params={"page": 1})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json()) > 0)

        response = self.client.post(
            self.base_url + "/api/admin/add-event",
            data=json.dumps(self.data),
            headers=headers,
        )
        self.assertEqual(response.status_code, 409)

        data = self.data.copy()
        data["event_info"] = "Test Info"
        response = self.client.put(
            self.base_url + "/api/admin/update-event",
            data=json.dumps(data),
            headers=headers,
        )
        self.assertEqual(response.status_code, 200)

        response = self.client.delete(
            self.base_url + "/api/admin/delete-event",
            data=json.dumps({"event_name": self.data["event_name"]}),
            headers=headers,
        )
        self.assertEqual(response.status_code, 200)
