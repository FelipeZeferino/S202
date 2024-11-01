from database import Database

uri = 'bolt://44.220.80.28'
user = 'neo4j'
password = 'sky-way-apple'

db = Database(uri,user,password)

# 1 - Busque pelo professor “Teacher” cujo nome seja “Renzo”, retorne o ano_nasc e o CPF.

query = 'MATCH (t:Teacher {name: "Renzo"}) RETURN t.ano_nasc, t.cpf'
data = db.execute_query(query,{})
print(data)
print(data[0])
print(data[0]['t.ano_nasc'])
print(data[0]['t.cpf'])

# 2 - Busque pelos professores “Teacher” cujo nome comece com a letra “M”, retorne o name e o cpf.

query = 'MATCH (t:Teacher) WHERE t.name STARTS WITH "M" RETURN t.name, t.cpf'
data = db.execute_query(query,{})
for i in range(len(data)):
    print(f"{i}: Name: {data[i]['t.name']}, CPF: {data[i]['t.cpf']}")


# 3 - Busque pelos nomes de todas as cidades “City” e retorne-os.

query = 'MATCH (c:City) where c.name = "Serra da Saudade" return c.name'
data = db.execute_query(query,{})
print(data[0]['c.name'])

query = 'MATCH (c:City) where c.name = "Cidadezinha" return c.name'
data = db.execute_query(query,{})
print(data[0]['c.name'])

query = 'MATCH (c:City) where c.name STARTS WITH "Santa Rita do Sapuc" return c.name'
data = db.execute_query(query,{})
print(data[0]['c.name'])

# 4 - Busque pelas escolas “School”, onde o number seja maior ou igual a 150 e menor ou igual a 550, retorne o nome da escola,
#  o endereço e o número.
 
query = 'MATCH (s:School) WHERE s.number >= 150 AND s.number < 550 RETURN s.name, s.address'
data = db.execute_query(query,{})
for i in range(len(data)):
    print(f"Escola {i}: Name: {data[i]['s.name']}, Endereço: {data[i]['s.address']}")


# QUESTÃO 2

# 1 - Encontre o ano de nascimento do professor mais jovem e do professor mais velho.

query = 'MATCH (t:Teacher) RETURN t.ano_nasc, t.name ORDER BY t.ano_nasc DESC LIMIT 1'
data = db.execute_query(query,{})
print(data[0]['t.name'])
print(data[0]['t.ano_nasc'])

query = 'MATCH (t:Teacher) RETURN t.name, t.ano_nasc ORDER BY t.ano_nasc ASC LIMIT 1'
data = db.execute_query(query,{})
print(data[0]['t.name'])
print(data[0]['t.ano_nasc'])

# 2 - Encontre a média aritmética para os habitantes de todas as cidades, use a propriedade “population”.

query = 'MATCH (c:City) RETURN AVG(c.population) AS average'
data = db.execute_query(query,{})
print('Média de população:', data[0]['average'])

# 3 - Encontre a cidade cujo CEP seja igual a “37540-000” e retorne o nome com todas as letras “a” substituídas por “A” .

query = 'MATCH (c:City) WHERE c.cep = "37540-000" RETURN replace(c.name, "a", "A") as name'
data = db.execute_query(query,{})
print(data[0]['name'])


# 4 - Para todos os professores, retorne um caractere, iniciando a partir da 3ª letra do nome.

query = 'MATCH (t:Teacher) RETURN substring(t.name, 2, 1) as name'
data = db.execute_query(query,{})
for i in range(len(data)):
    print(f"Professor {i}: {data[i]['name']}")
