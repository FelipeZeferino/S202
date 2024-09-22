import { MongoClient } from 'mongodb';

class Database {
    constructor(database, collection) {
        this.database = database;
        this.collection = collection;
    }

    async connect(database, collection) {
        try {
            const connectionString = "mongodb+srv://root:root@cluster0.z2xg2.mongodb.net/";
            this.clusterConnection = new MongoClient(connectionString, {
                tlsAllowInvalidCertificates: true,
            });

            await this.clusterConnection.connect();
            this.db = this.clusterConnection.db(this.database);
            this.collection = this.db.collection(this.collection);
            console.log("Conectado ao banco de dados com sucesso!");
        } catch (e) {
            console.error("Erro ao conectar ao banco de dados:", e);
        }
    }
}

export default Database;
