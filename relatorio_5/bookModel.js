import { ObjectId } from "bson";

export class bookModel {
    constructor(database, collection) {
        this._database = database;
        this._collection = collection;
    }

    async reset_database(){
        try {
            const success = await this._database.dropDatabase()
            console.log("Database Deletada com sucesso")
        } catch (error) {
            console.error(error)
        }
    }

    async create_book(book) {
        try {
            const response = await this._collection.insertOne(book);
            console.log(`A document was inserted with the _id: ${response.insertedId}`);
        }
        catch (error) {
            console.log(error)
        }
    }

    async delete_book(id) {
        try {
            const response = await this._collection.deleteOne({"_id": id});
            if (response.deletedCount > 0) {
                console.log(`Livro deletado com id ${id}`);
            } else {
                console.log(`Nenhum livro encontrado com o _id: ${id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async search_bookByID(id) {
        try {
            const response = await this._collection.findOne({"_id": id});
            if(response !== null)
                return response
            else throw new Error("Livro não encontrado")
        } catch (error) {
            console.error(error);
        }
    }
    async search_bookByTitle (title) {
        try {
            const response = await this._collection.findOne({"titulo": title});
            if(response !== null)
                return response
            else throw new Error("Livro não encontrado")
        } catch (error) {
            console.error(error);
        }
    }

    async update_book (id, newBook) {
        try {
            const result = await this._collection.replaceOne({"_id": id}, newBook);
            if(response !== null)
                return response
            else throw new Error("Não foi possivel alterar o livro desejado")
        } catch (error) {
            console.error(error);
        }

    }

}

