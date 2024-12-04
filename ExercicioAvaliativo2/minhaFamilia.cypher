CREATE (:Pessoa:Estudante{nome: "Felipe", idade: 23, sexo: "M"});
CREATE (:Pessoa:Estudante{nome: "Victor", idade: 24, sexo: "M"});
CREATE (:Pessoa:Engenheiro{nome: "Silas", idade: 31, sexo: "M"});
CREATE (:Pessoa:Dona_de_casa{nome: "Vani", idade: 59, sexo: "F"});
CREATE (:Pessoa:Engenheiro{nome: "Mauro", idade: 57, sexo: "M"});
CREATE (:Pessoa:Estudante{nome: "Anna", idade: 22, sexo: "F"});
CREATE (:Pessoa:Estudante{nome: "Mari", idade: 20, sexo: "F"});
CREATE (:Pessoa:Administradora{nome: "Ana Caroline", idade: 29, sexo: "F"});

CREATE (:Pet:Gato{nome: "Lina", idade: 8, sexo: "F"});
CREATE (:Pet:Gato{nome: "Kiara", idade: 4, sexo: "F"});
CREATE (:Pet:Gato{nome: "Bruce", idade: 2, sexo: "M"});


MATCH (f:Pessoa {nome: "Felipe"}),
      (v:Pessoa {nome: "Victor"}),
      (s:Pessoa {nome: "Silas"})

CREATE (f)-[:IRMAO_DE]->(v),
       (v)-[:IRMAO_DE]->(f),
       (f)-[:IRMAO_DE]->(s),
       (s)-[:IRMAO_DE]->(f),
       (v)-[:IRMAO_DE]->(s),
       (s)-[:IRMAO_DE]->(v);


MATCH (vani:Pessoa {nome: "Vani"}),
      (mauro:Pessoa {nome: "Mauro"}),
      (silas:Pessoa {nome: "Silas"}),
      (felipe:Pessoa {nome: "Felipe"}),
      (victor:Pessoa {nome: "Victor"})

CREATE (mauro)-[:PAI_DE]->(silas),
       (mauro)-[:PAI_DE]->(felipe),
       (mauro)-[:PAI_DE]->(victor),
       (vani)-[:PAI_DE]->(silas),
       (vani)-[:PAI_DE]->(felipe),
       (vani)-[:PAI_DE]->(victor);


MATCH (mauro:Pessoa {nome: "Mauro"}),
      (vani:Pessoa {nome: "Vani"}),
      (felipe:Pessoa {nome: "Felipe"}),
      (anna:Pessoa {nome: "Anna"}),
      (silas:Pessoa {nome: "Silas"}),
      (anaCaroline:Pessoa {nome: "Ana Caroline"}),
      (victor:Pessoa {nome: "Victor"}),
      (mari:Pessoa {nome: "Mari"})

CREATE (mauro)-[:CASADO_COM {desde: 1990}]->(vani),
       (vani)-[:CASADO_COM {desde: 1990}]->(mauro),
       (felipe)-[:CASADO_COM {desde: 2024}]->(anna),
       (anna)-[:CASADO_COM {desde: 2024}]->(felipe),
       (silas)-[:CASADO_COM {desde: 2017}]->(anaCaroline),
       (anaCaroline)-[:CASADO_COM {desde: 2017}]->(silas),
       (victor)-[:CASADO_COM {desde: 2024}]->(mari),
       (mari)-[:CASADO_COM {desde: 2024}]->(victor);

MATCH (felipe:Pessoa {nome: "Felipe"}),
      (victor:Pessoa {nome: "Victor"}),
      (vani:Pessoa {nome: "Vani"}),
      (lina:Pet {nome: "Lina"}),
      (bruce:Pet {nome: "Bruce"}),
      (kiara:Pet {nome: "Kiara"})

CREATE (felipe)-[:DONO_DE]->(lina),
       (victor)-[:DONO_DE]->(bruce),
       (vani)-[:DONO_DE]->(kiara);
















