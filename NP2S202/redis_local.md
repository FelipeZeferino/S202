Aqui está um tutorial para instalar o Docker no Windows e executar um container com a imagem do Redis, configurado para ser acessado por um script simples em Python.

---

### **1. Instalar o Docker no Windows**

1. **Baixar o Docker Desktop:**
   - Acesse o site oficial do Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
   - Baixe o instalador do Docker Desktop para Windows.

2. **Instalar o Docker Desktop:**
   - Execute o instalador baixado.
   - Siga as instruções na tela, garantindo que a opção para ativar o **WSL 2 (Windows Subsystem for Linux)** esteja marcada, se solicitado.
   - Reinicie o computador, se necessário.

3. **Configurar o Docker Desktop:**
   - Abra o Docker Desktop.
   - Certifique-se de que ele está rodando sem erros. Você verá um ícone verde indicando que o Docker está ativo.

4. **Verificar a instalação:**
   - Abra o **Prompt de Comando** ou o **PowerShell**.
   - Execute o comando: 
     ```bash
     docker --version
     ```
   - Se a instalação foi bem-sucedida, você verá a versão do Docker instalada.

---

### **2. Baixar e Executar um Container Redis**

1. **Baixar a imagem do Redis:**
   - No **Prompt de Comando** ou no **PowerShell**, execute:
     ```bash
     docker pull redis
     ```

2. **Executar o container Redis:**
   - Execute o seguinte comando para iniciar o Redis em um container:
     ```bash
     docker run -d --name redis-container -p 6379:6379 redis
     ```
     - **`-d`**: Executa o container em segundo plano.
     - **`--name redis-container`**: Dá o nome "redis-container" ao container.
     - **`-p 6379:6379`**: Mapeia a porta 6379 do container para a porta 6379 do host.

3. **Verificar se o Redis está rodando:**
   - Execute:
     ```bash
     docker ps
     ```
   - O Redis deve aparecer na lista de containers ativos.

---

### **3. Acessar o Redis com um Script Python**

1. **Instalar a biblioteca `redis` no Python:**
   - Certifique-se de que você tem o Python instalado (recomenda-se usar o Python 3).
   - No terminal, execute:
     ```bash
     pip install redis
     ```

2. **Criar um script Python para se conectar ao Redis:**
   - Crie um arquivo chamado `redis_test.py` e insira o seguinte código:
     ```python
     import redis

     # Conectar ao Redis
     client = redis.Redis(host='localhost', port=6379, decode_responses=True)

     # Testar conexão
     try:
         client.ping()
         print("Conexão com o Redis bem-sucedida!")
     except redis.ConnectionError:
         print("Falha ao conectar ao Redis.")

     # Inserir e recuperar dados
     client.set('chave', 'valor')
     print("Valor armazenado:", client.get('chave'))
     ```

3. **Executar o script:**
   - No terminal, execute:
     ```bash
     python redis_test.py
     ```
   - Se tudo estiver configurado corretamente, você verá a mensagem de conexão bem-sucedida e o valor armazenado no Redis.

---

Pronto! Agora você tem o Redis rodando em um container Docker e conectado a um script Python simples. Se precisar de ajuda com algum passo, é só avisar!