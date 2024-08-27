from pymongo import MongoClient

mongoClient = MongoClient("mongodb://localhost:27017/")

print(mongoClient)