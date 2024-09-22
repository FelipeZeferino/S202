import Database from "./database.js"
import { MongoClient } from "mongodb"

class MotoristaDAO {
    constructor(database, collection) {
        this.database = new Database(database, collection);
    }

    async dbConnect () {
        await this.database.connect();
    }

    async writeDriver(driver) {
        try {
            const result = await this.database.collection.insertOne(driver);
            console.log("Documento inserido com sucesso:", result.insertedId);
        } catch (e) {
            console.error("Erro ao inserir documento:", e);
        }
    }
    async getAllDrivers() {
        try {
          const drivers = await this.database.collection.find({}).toArray();
          return drivers;
        } catch (e) {
          console.error("Erro ao recuperar motoristas:", e);
        }
      }
      

    async readDriverByName(name) {
        try {
            const result = await this.database.collection.findOne({ name: name });
            if (result) {
                console.log("Documento encontrado:", result);
                return result;
            } else {
                console.log("Nenhum documento encontrado com o nome:", name);
                return null;
            }
        } catch (e) {
            console.error("Erro ao buscar documento:", e);
        }
    }
    

    async deleteDriverBycpf(cpf) {
        try {
            const result = await this.database.collection.deleteOne({ cpf: cpf });
            if (result.deletedCount > 0) {
                console.log("Documento excluído com sucesso.");
            } else {
                console.log("Nenhum documento encontrado com o CPF:", cpf);
            }
        } catch (e) {
            console.error("Erro ao excluir documento:", e);
        }
    }

    async updateDriver(cpf, updateData) {
        try {
            const result = await this.database.collection.updateOne(
                { cpf: cpf },
                { $set: updateData }
            );
    
            if (result.matchedCount > 0) {
                console.log("Documento atualizado com sucesso.");
            } else {
                console.log("Nenhum documento encontrado com o CPF:", cpf);
            }
        } catch (e) {
            console.error("Erro ao atualizar documento:", e);
        }
    }
}

export { MotoristaDAO };