from database import Database
from match_database import MatchesDatabase

# cria uma instância da classe Database, passando os dados de conexão com o banco de dados Neo4j
db = Database("bolt://34.205.141.106:7687", "neo4j", "voice-centimeter-animal")
db.drop_all()

# Criando uma instância da classe SchoolDatabase para interagir com o banco de dados
match_db = MatchesDatabase(db)


#Criando players
match_db.create_player("João")
match_db.create_player("Gustavo")
match_db.create_player("José")
match_db.create_player("Tiago")

#Criando partidas
match_db.create_match("João")
match_db.create_match("Gustavo")
match_db.create_match("José")
match_db.create_match("Tiago")

#Criando relações de jogadores com partidas
match_db.insert_player_match("João","Gustavo")
match_db.insert_player_match("Gustavo", "João")
match_db.insert_player_match("José", "Tiago")
match_db.insert_player_match("Tiago", "José")

#Inserindo vencedores
match_db.insert_winner_match("João","Gustavo")
match_db.insert_winner_match("José","Tiago")
match_db.insert_winner_match("Tiago","José")

#Atualizando o nome de um player
match_db.update_player("João", "Paulo")
match_db.update_player("Gustavo", "Jonas")
match_db.update_player("José", "Marcos")
match_db.update_player("Tiago", "Levi")

# Imprimindo todas as informações do banco de dados
print("Players:")
print(match_db.get_players())
print("Partidas:")
print(match_db.get_matches())

#Deletando alunos
match_db.delete_player("Paulo")

#Deletando matches
match_db.delete_match("João")
match_db.delete_match("Gustavo")
match_db.delete_match("José")
match_db.delete_match("Tiago")

# Fechando a conexão com o banco de dados
db.close()