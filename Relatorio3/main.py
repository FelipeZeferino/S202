from database import Database
from helper.WriteAJson import writeAJson
from pokedex import Pokedex

db = Database(database="pokedex", collection="pokemons")
# db.resetDatabase()

pokedex = Pokedex(db)
result = pokedex.procura_por_tipo("fire")
for pokemon in result:
    name = pokemon.get("name", "Unknown")
    print(name)
result = pokedex.candy_count_maior_20()
for pokemon in result:
    name = pokemon.get("name", "Unknown")
    writeAJson(pokemon, str(name))
writeAJson(pokedex.procura_por_nome("Bulbasaur"), str("Bulbasaur"))
response = pokedex.pokemons_com_2fraquezas()
for result in response:
    name = result.get("name", "Unknown")
    writeAJson(result, name)
todos = pokedex.todos_pokemons()
for result in todos:
    name = result.get("name", "Unknown")
    print(name)


