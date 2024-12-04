class MatchesDatabase:
    def __init__(self, database):
        self.db = database

    def create_player(self, name):
        query = "CREATE (:Player {name: $name})"
        parameters = {"name": name}
        self.db.execute_query(query, parameters)

    def create_match(self, name):
        query = "CREATE (:Match {host: $name})"
        parameters = {"name": name}
        self.db.execute_query(query, parameters)


    def get_players(self):
        query = "MATCH (p:Player) RETURN p.name AS name"
        results = self.db.execute_query(query)
        return [result["name"] for result in results]

    def get_matches(self):
        query = "MATCH (a:Match) RETURN a.host AS host"
        results = self.db.execute_query(query)
        return [result["host"] for result in results]


    def update_player(self, old_name, new_name):
        query = "MATCH (p:Player {name: $old_name}) SET p.name = $new_name"
        parameters = {"old_name": old_name, "new_name": new_name}
        self.db.execute_query(query, parameters)
        
    def insert_player_match(self, player_name, host_name):
        query = "MATCH (a:Player {name: $player_name}) MATCH (b:Match {host: $host_name}) CREATE (a)-[:JOGOU]->(b)"
        parameters = {"name": player_name, "host": host_name}
        self.db.execute_query(query, parameters)

    def insert_winner_match(self, player_name, host_name):
        query = "MATCH (a:Player {name: $player_name}) MATCH (b:Match {host: $host_name}) CREATE (a)-[:GANHOU]->(b)"
        parameters = {"name": player_name, "host": host_name}
        self.db.execute_query(query, parameters)
    
    def delete_player(self, name):
        query = "MATCH (p:Player {name: $name}) DETACH DELETE p"
        parameters = {"name": name}
        self.db.execute_query(query, parameters)

    def delete_match(self, host_name):
        query = "MATCH (a:Match {host: $host_name}) DETACH DELETE a"
        parameters = {"host": host_name}
        self.db.execute_query(query, parameters)