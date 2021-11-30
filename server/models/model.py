from typing import Dict, Union
import pymongo
from . import errors
import random
import string


class Model:
    def __init__(self, mongo_uri: str, database: str):
        _uri = mongo_uri
        self.db = pymongo.MongoClient(_uri)[database]

    @staticmethod
    def sanitize_data(data: Dict[str, Union[str, None]]):
        """Remove all None values from dict and return new dict

        Args:
            data (Dict[str, Union[str, None]]): Data sent through API

        Returns:
            (Dict[str, str]): Relevant data
        """
        _data = {}
        for key, val in data.items():
            if val:
                _data[key] = val
        return _data

    def get_uid(self) -> str:
        """Returns 8 character alpha numeric unique id

        Returns:
            str: [Alpha numeric id]
        """

        gen_id = random.choices(string.ascii_uppercase + string.digits, k=8)

        if self.db.collection.find_one({"_id": gen_id}):
            return self.get_uid(length=8)

        return "".join(gen_id)

    def team_data(self, skip: int, limit: int, id=False) -> pymongo.cursor.Cursor:
        """Get team details with pagination

        Args:
            skip (int): Items to skip
            limit (int): Limit docs
            id (bool, optional): Default to False: Query member id

        Returns:
            pymongo.cursor.Cursor: cursor object
        """
        pipeline = [{"$skip": skip}, {"$limit": limit}, {"$project": {"_id": id}}]
        if id:
            pipeline = pipeline[:-1]
        return self.db.Team.aggregate(pipeline=pipeline)

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

    def events_data(self, skip, limit, id=False):
        pipeline = [{"$skip": skip}, {"$limit": limit}, {"$project": {"_id": id}}]
        if id:
            pipeline = pipeline[:-1]
        return self.db.Events.aggregate(pipeline=pipeline)

    def insert_event_data(self, data: Dict[str, str]):
        doc = self.db.Events.find_one({"event_name": data["event_name"]})
        if doc:
            raise errors.EventExistsError()
        data["_id"] = self.get_uid()
        self.db.Events.insert_one(data)

    def update_event_data(self, data: Dict[str, str]):
        event_id = data.pop("id")
        _data = self.sanitize_data(data)
        doc = self.db.Events.find_one_and_update(
            {"_id": event_id}, update={"$set": _data}
        )
        if not doc:
            raise errors.EventDoesNotExistError()
        return doc["event_name"]

    def delete_event_data(self, _id: str):
        doc = self.db.Events.find_one_and_delete({"_id": _id})
        if not doc:
            raise errors.EventDoesNotExistError()
        return doc["event_name"]

    def insert_team_data(self, data: Dict[str, str]):
        doc = self.db.Team.find_one({"name": data["name"]})
        if doc:
            raise errors.MemberExistsError()
        data["_id"] = self.get_uid()
        self.db.Team.insert_one(data)

    def update_team_data(self, data):
        member_id = data.pop("id")
        _data = self.sanitize_data(data)
        doc = self.db.Team.find_one_and_update(
            {"_id": member_id}, update={"$set": _data}
        )
        if not doc:
            raise errors.MemberDoesNotExistError()
        return doc["name"]

    def delete_team_data(self, _id: str):
        doc = self.db.Team.find_one_and_delete({"_id": _id})
        if not doc:
            raise errors.MemberDoesNotExistError()
        return doc["name"]
