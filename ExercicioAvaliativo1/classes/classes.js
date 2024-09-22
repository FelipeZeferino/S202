import { MotoristaDAO } from "./motoristaDAO.js";

class Motorista {
    constructor(name, cpf, rating, corridas) {
        this.name = name;
        this.cpf = cpf;
        this.rating = rating;
        this.corridas = corridas;
    }

    aceitarCorrida(corrida) {
        this.corridas.push(corrida)
    }

}

class Corrida {
    constructor(nota, distancia, valor, passageiro) {
        this.nota = nota;
        this.distancia = distancia;
        this.valor = valor;
        this.passageiro = passageiro;
    }
}

class Passageiro {
    constructor(name, documento) {
        this.name = name;
        this.documento = documento;
    }
}

export { Motorista, Corrida, Passageiro }
