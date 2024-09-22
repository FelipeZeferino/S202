import { Motorista, Passageiro, Corrida } from "./classes/classes.js";
import readline from 'readline';
import { MotoristaDAO } from "./classes/motoristaDAO.js";

 

class MotoristaCLI {
  constructor() {
    this.motoristasDAO = new MotoristaDAO("atlas_cluster", "Motoristas");
    this.motoristas = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  askQuestion(question) {
    return new Promise((resolve) => {
        this.rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}


showMenu() {
  console.log(`
    Menu:
    1. Criar Motorista
    2. Listar Motoristas
    3. Deletar Motorista por cpf
    4. Atualizar Motorista
    5. Sair
  `);

  this.rl.question('Escolha uma opção: ', async (option) => {
    switch (option) {
      case '1':
        const motor = await this.createMotorista();
        await this.motoristasDAO.writeDriver(motor);
        console.log('Motorista criado com sucesso!');
        this.showMenu();
        break;
      case '2':
        await this.listMotoristas();
        this.showMenu();
        break;
      case '3':
        await this.deleteDriverBycpf();
        this.showMenu();
        break;
      case '4':
        await this.updateDriver();
        this.showMenu();
        break;
      case '5':
        console.log('Saindo...');
        this.rl.close();
        break;
      default:
        console.log('Opção inválida.');
        this.showMenu();
    }
  });
}

async deleteDriverBycpf() {
  const cpf = await this.askQuestion('Cpf do Motorista: ');
  await this.motoristasDAO.deleteDriverBycpf(cpf);
}

async updateDriver() {
  const nome = await this.askQuestion('Nome do Motorista: ');
  const driverToModify = await this.motoristasDAO.readDriverByName(nome);
  
  if (driverToModify) {
    const newName = await this.askQuestion("Digite o novo Nome (ou pressione Enter para manter o atual): ");
    const newCpf = await this.askQuestion("Digite o novo CPF (ou pressione Enter para manter o atual): ");
    const newRating = await this.askQuestion("Digite o novo Rating (ou pressione Enter para manter o atual): ");
    
    const updatedDriver = {
      name: newName || driverToModify.name,
      cpf: newCpf || driverToModify.cpf,
      rating: newRating ? parseFloat(newRating) : driverToModify.rating
    };

    await this.motoristasDAO.updateDriver(driverToModify.cpf, updatedDriver);
  } else {
    console.log('Motorista não encontrado.');
  }
}




  async createMotorista() {
    const nomePassageiro = await this.askQuestion('Nome do passageiro: ');
    const documentoPassageiro = await this.askQuestion('Documento do passageiro: ');
    const passageiro = new Passageiro(nomePassageiro, documentoPassageiro);
    const corridas = []

    

    while (true) {
        console.log("Agora, adicione as corridas desse passageiro (digite -1 para sair): ");
        
        let notaCorrida = await this.askQuestion("Entre com a nota da corrida: ");
        if (notaCorrida === '-1') break;
      
        let distanciaCorrida = await this.askQuestion("Entre com a distância da corrida: ");
        if (distanciaCorrida === '-1') break;
      
        let valorCorrida = await this.askQuestion("Entre com o valor da corrida: ");
        if (valorCorrida === '-1') break;
      
        let corrida = new Corrida(notaCorrida, distanciaCorrida, valorCorrida, passageiro);
        corridas.push(corrida);
      }

      let nomeMotorista = await this.askQuestion("Nome do Motorista: ");
      let cpfMotorista = await this.askQuestion("CPF do Motorista: ");
      let notaMotorista = await this.askQuestion("Nota do Motorista: ");
      const motorista = new Motorista(nomeMotorista, cpfMotorista, notaMotorista, corridas);
      this.motoristas.push(motorista);
      return motorista
    }
    

  async listMotoristas() {
    const response = await this.motoristasDAO.getAllDrivers();
    if(response) {
      response.map((driver, index) => {
        console.log(`
          Motorista ${index + 1}:
          Nome: ${driver.name}
          CPF: ${driver.cpf}
          Nota: ${driver.rating}
          Corridas: ${driver.corridas.map(c => `Distancia: ${c.distancia}, Valor: ${c.valor}, Nota: ${c.nota}`).join('; ')}
        `
      )})
    }
  }
}

export { MotoristaCLI }