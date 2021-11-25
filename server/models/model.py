from typing import Dict
import pymongo
from . import errors


class Model:
    def __init__(self, mongo_uri: str, database: str):
        _uri = mongo_uri
        self.db = pymongo.MongoClient(_uri)[database]

    def team_data(self, skip: int, limit: int) -> pymongo.cursor.Cursor:
        """Get team details with pagination

        Args:
            skip (int): Items to skip
            limit (int): Limit docs

        Returns:
            pymongo.cursor.Cursor: cursor object
        """
        return self.db.Team.aggregate(
            pipeline=[{"$skip": skip}, {"$limit": limit}, {"$project": {"_id": 0}}]
        )

    def insert_contact_details(self, data: Dict[str, str]):
        self.db.ContactUs.insert_one(data)

    def about_us(self):
        return self.db.AboutUs.find({}, {"_id": 0})

    def admin_register(self, data: Dict[str, str]):
        doc = self.db.Admin.find_one({"email": data["email"]})
        if doc:
            raise errors.AdminExistsError()
        self.db.Admin.insert_one(data)

    def admin_from_email(self, email: str):
        doc = self.db.Admin.find_one({"email": email})
        if doc:
            return doc
        raise errors.AdminDoesNotExistError(msg="Invalid email Id", status_code=403)

    def events_data(self, skip, limit):
        return self.db.Events.aggregate(
            pipeline=[{"$skip": skip}, {"$limit": limit}, {"$project": {"_id": 0}}]
        )

    def insert_event_data(self, data: Dict[str, str]):
        doc = self.db.Events.find_one({"event_name": data["event_name"]})
        if doc:
            raise errors.EventExistsError()
        self.db.Events.insert_one(data)

    def update_event_data(self, data: Dict[str, str]):
        event_name = data.pop("event_name")
        for key, val in data.items():
            if not len(val):
                data.pop(key)

        doc = self.db.Events.find_one_and_update(
            {"event_name": event_name}, update={"$set": data}
        )
        if not doc:
            raise errors.EventDoesNotError()

    def delete_event_data(self, name: str):
        doc = self.db.Events.find_one_and_delete({"event_name": name})
        if not doc:
            raise errors.EventDoesNotError()
