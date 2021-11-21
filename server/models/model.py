import pymongo


class Model:
    def __init__(self, mongo_uri: str, database: str):
        _uri = mongo_uri
        self.db = pymongo.MongoClient(_uri)[database]

    def get_team(self, skip: int, limit: int) -> pymongo.cursor.Cursor:
        """Get team details with pagination

        Args:
            skip (int): Items to skip
            limit (int): Limit docs

        Returns:
            pymongo.cursor.Cursor: cursor object
        """
        return self.db.Team.aggregate(pipeline=[{"$skip": skip}, {"$limit": limit}])

    def insert_contact_details(self, data):
        self.db.ContactUs.insert(data)
