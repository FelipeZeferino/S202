from database import Database

uri = 'bolt://44.220.80.28'
user = 'neo4j'
password = 'sky-way-apple'

class TeacherCRUD:
    def __init__(self):
        self.db = Database(uri, user, password)
    
    def create(self, name, ano_nasc, cpf):
        query = 'CREATE (t:Teacher{ name: $name, ano_nasc: $ano_nasc, cpf: $cpf })'
        self.db.execute_query(query, {'name': name, 'ano_nasc': ano_nasc, 'cpf': cpf})

    def read(self, name):
        query = 'MATCH (t:Teacher {name: $name}) RETURN t'
        result = self.db.execute_query(query, {'name': name})
        return result[0]["t"]._properties

    def update(self, name, newCpf):
        query = 'MATCH (t:Teacher {name: $name}) SET t.cpf = $newCpf RETURN t'
        self.db.execute_query(query, {'name': name, 'newCpf': newCpf})

    def delete(self, name):
        query = 'MATCH (t:Teacher {name: $name}) DETACH DELETE t'
        self.db.execute_query(query, {'name': name})





def main():
    tc = TeacherCRUD()

    try:
        tc.create("Chris Lima", 1956, '189.052.396-66')
        print("Professor Chris Lima criado com sucesso!")
    except Exception as e:
        print(f"Erro ao criar o professor: {e}")

    try:
        node = tc.read("Chris Lima")
        print(f"Professor encontrado: {node}")
    except IndexError:
        print("Professor Chris Lima não encontrado")
    except Exception as e:
        print(f"Erro ao ler o professor: {e}")

    try:
        tc.update("Chris Lima", "162.052.777-77")
        print("Professor Chris Lima atualizado com sucesso!")
    except IndexError:
        print("Não foi possível atualizar o professor Chris Lima")
    except Exception as e:
        print(f"Erro ao atualizar o professor: {e}")

    try:
        tc.delete("Chris Lima")
        print("Professor Chris Lima deletado com sucesso!")
    except IndexError:
        print("Não foi possível deletar o professor Chris Lima")
    except Exception as e:
        print(f"Erro ao deletar o professor: {e}")
    
    while True:
        print("\nTeacher CRUD CLI")
        print("1. Criar Professor")
        print("2. Ler Professor")
        print("3. Atualizar Professor")
        print("4. Deletar Professor")
        print("5. Sair")
        
        choice = input("Digite sua escolha: ")
        
        if choice == '1':
            name = input("Digite o nome: ")
            ano_nasc = input("Digite o ano de nascimento: ")
            cpf = input("Digite o CPF: ")
            tc.create(name, ano_nasc, cpf)
            print("Professor criado com sucesso!")
        
        elif choice == '2':
            name = input("Digite o nome: ")
            try:
                node = tc.read(name)
                print(node)
            except IndexError:
                print("Professor não encontrado")
        
        elif choice == '3':
            name = input("Digite o nome: ")
            newCpf = input("Digite o novo CPF: ")
            try:
                tc.update(name, newCpf)
                print("Professor atualizado com sucesso!")
            except IndexError:
                print("Não foi possível atualizar o professor")
        
        elif choice == '4':
            name = input("Digite o nome: ")
            try:
                tc.delete(name)
                print("Professor deletado com sucesso!")
            except IndexError:
                print("Não foi possível deletar o professor")
        
        elif choice == '5':
            print("Saindo...")
            break
        
        else:
            print("Escolha inválida. Tente novamente.")

if __name__ == "__main__":
    main()