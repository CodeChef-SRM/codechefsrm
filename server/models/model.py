from typing import Dict
import pymongo
from .errors import AdminExistsError


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
            raise AdminExistsError()
        self.db.Admin.insert_one(data)

    def admin_from_email(self, email: str):
        doc = self.db.Admin.find_one({"email": email})
        if doc:
            return doc

    def events_data(self, skip, limit):
        return self.db.Events.aggregate(
            pipeline=[{"$skip": skip}, {"$limit": limit}, {"$project": {"_id": 0}}]
        )
