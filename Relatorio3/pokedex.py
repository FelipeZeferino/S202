from database import Database as db

class Pokedex:
    def __init__(self, Database: db):
        self._Database = Database
    
    def procura_por_tipo(self, tipo):
        return self._Database.collection.find({"type": tipo})
    def procura_por_nome(self, nome):
        return self._Database.collection.find_one({"name":nome})
    def pokemons_com_2fraquezas(self):
        return self._Database.collection.find({"weaknesses": {"$size": 2}})
    def todos_pokemons(self):
        return self._Database.collection.find()
    def candy_count_maior_20(self):
       return self._Database.collection.find({"candy_count": {"$gt": 20}})

         