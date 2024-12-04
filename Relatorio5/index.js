import { MongoClient } from "mongodb";
import { bookModel } from "./bookModel.js";
import readline from "readline";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const database = client.db("Relatorio_5CRUD");
const collection = database.collection("Livros");

const livros = new bookModel(database, collection);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    while (true) {
        console.log("\nBem-vindo! Escolha uma opção:");
        console.log("1. Criar um novo livro");
        console.log("2. Pesquisar livro por título");
        console.log("3. Pesquisar livro por ID");
        console.log("4. Deletar um livro");
        console.log("5. Alterar um livro");
        console.log("6. Sair");

        const option = await askQuestion("Escolha: ");
        switch (option) {
            case "1":
                const newBookID = await askQuestion("Entre com o id: ")
                const newBookTitle = await askQuestion("Entre com o titulo: ")
                const newBookAuthor = await askQuestion("Entre com o nome do autor: ")
                const newBookYear = await askQuestion("Entre com o ano de publicação: ")
                const newBookPrice = await askQuestion("Entre com o preço do livro: ")
                const newBook = {
                    "_id": newBookID,
                    "titulo": newBookTitle,
                    "autor": newBookAuthor,
                    "ano": newBookYear,
                    "preco": newBookPrice
                }
                await livros.create_book(newBook);
                console.log("Livro criado com sucesso!");
                break;
            case "2":
                const title = await askQuestion("Digite o título do livro: ");
                const booksByTitle = await livros.search_bookByTitle(title);
                console.log("Livros encontrados pelo título:", booksByTitle);
                break;
            case "3": //nao passou
                const id = await askQuestion("Digite o ID do livro: ");
                const bookByID = await livros.search_bookByID(parseInt(id));
                console.log("Livro encontrado pelo ID:", bookByID);
                break;
            case "4":
                const deleteID = await askQuestion("Digite o ID do livro para deletar: ");
                const resposta = await livros.delete_book(parseInt(deleteID));
                console.log(resposta);
                break;
            case "5":
                const idLivro = await askQuestion("Entre com o ID do livro que deseja alterar: ");
                const bookToModify = await livros.search_bookByID(parseInt(idLivro));
            
                if (bookToModify) {
                    console.log("Livro encontrado:", bookToModify);
            
                    const newTitle = await askQuestion("Digite o novo título (ou pressione Enter para manter o atual): ");
                    const newAuthor = await askQuestion("Digite o novo autor (ou pressione Enter para manter o atual): ");
                    const newYear = await askQuestion("Digite o novo ano (ou pressione Enter para manter o atual): ");
                    const newPrice = await askQuestion("Digite o novo preço (ou pressione Enter para manter o atual): ");
            
                    const updatedBook = {
                        ...bookToModify,
                        titulo: newTitle || bookToModify.titulo,
                        autor: newAuthor || bookToModify.autor,
                        ano: newYear ? parseInt(newYear) : bookToModify.ano,
                        preco: newPrice ? parseFloat(newPrice) : bookToModify.preco
                    };
            
                    await livros.update_book(parseInt(idLivro), updatedBook);
                    console.log("Livro atualizado com sucesso!");
                } else {
                    console.log("Livro não encontrado.");
                }
                break;
            case "6":
                console.log("Saindo...");
                rl.close();
                return;
            default:
                console.log("Opção inválida, por favor tente novamente.");
        }
    }
}

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

main().catch((error) => {
    console.error("Ocorreu um erro:", error);
});
