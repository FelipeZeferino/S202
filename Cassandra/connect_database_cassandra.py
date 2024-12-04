from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import json

import matplotlib.pyplot as plt

# This secure connect bundle is autogenerated when you download your SCB, 
# if yours is different update the file name below
cloud_config= {
  'secure_connect_bundle': 'secure-connect-dbiot.zip'
}

# This token JSON file is autogenerated when you download your token, 
# if yours is different update the file name below
with open("dbiot-token.json") as f:
    secrets = json.load(f)

CLIENT_ID = secrets["clientId"]
CLIENT_SECRET = secrets["secret"]

auth_provider = PlainTextAuthProvider(CLIENT_ID, CLIENT_SECRET)
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect()

row = session.execute("select release_version from system.local").one()
if row:
  print(row[0])
else:
  print("An error occurred.")

session.set_keyspace('ksiot')

result = session.execute('DELETE FROM sensor WHERE id IN (25,72) and ano = 2021 and mes=5;')

if result is not None:
   print("Sucesso!")

result = session.execute('BEGIN BATCH '+
  'INSERT INTO sensor(id,ano,mes,dia,hora,leitura,limites,local,modelo) VALUES(25,2021,5,10,\'18:45\',33,{\'Inferior\':33,\'Superior\':33},\'SRS\',\'NestTemp1\');'+
  'INSERT INTO sensor(id,ano,mes,dia,hora,leitura,limites,local,modelo) VALUES(25,2021,5,10,\'19:00\',34,{\'Inferior\':33,\'Superior\':38},\'SRS\',\'NestTemp1\');'+
  'INSERT INTO sensor(id,ano,mes,dia,hora,leitura,limites,local,modelo) VALUES(25,2021,5,10,\'19:15\',37,{\'Inferior\':33,\'Superior\':38},\'SRS\',\'NestTemp1\');'+
  'INSERT INTO sensor(id,ano,mes,dia,hora,leitura,limites,local,modelo) VALUES(25,2021,5,10,\'19:30\',38,{\'Inferior\':33,\'Superior\':38},\'SRS\',\'NestTemp1\');'+
  'INSERT INTO sensor(id,ano,mes,dia,hora,leitura,limites,local,modelo) VALUES(25,2021,5,10,\'19:45\',37,{\'Inferior\':33,\'Superior\':38},\'SRS\',\'NestTemp1\');'+
  'APPLY BATCH;'
)

if result is not None:
   print("Sucesso!")

result = session.execute("SELECT * FROM sensor WHERE id=25 AND ano=2021 AND mes = 5 AND dia = 10 AND hora >= '18:45'").all()

# if result is not None:
#    for r in result:
#       print(r)

if result is not None:
  eixoX = []
  eixoY = []
  corPontos = {}
  local = result[0][7]
  sensor = result[0][8]
  
  for r in result:
      eixoX.append(r[4])
      eixoY.append(r[5])

      if(r[6]['Inferior'] < r[5] < r[6]['Superior']):
        corPontos[r[4]] = 'green'
      else:
         corPontos[r[4]] = 'red'

plt.title('Sensor ' + sensor + ' em ' + local)
plt.xlabel('Horarios'), plt.ylabel('Leituras')

for i in range(0, len(eixoX)):
  plt.scatter(eixoX[i], eixoY[i], color = corPontos[eixoX[i]], s = 150)

plt.plot(eixoX, eixoY, '--')

plt.show()
  