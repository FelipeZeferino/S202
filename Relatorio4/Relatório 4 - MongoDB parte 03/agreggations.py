from pymongo import MongoClient
from helper.writeAJson import writeAJson
from database import Database

class ProductAnalyzer:
    def __init__(self):
        self.client = MongoClient('localhost', 27017)
        self.db = Database(database="mercado", collection="compras")

    def ProdutoMaisVendido(self):
        result = self.db.collection.aggregate([
            {"$unwind": "$produtos"},
            {"$group": {"_id": "$produtos.descricao", "quantidade_total": {"$sum": "$produtos.quantidade"}}},
            {"$sort": {"quantidade_total": -1}},
            {"$limit": 1}
        ])
        writeAJson(result, "Produto mais vendido")

    def totalVendasPorDia(self):
        result = self.db.collection.aggregate([
            {"$unwind": "$produtos"},
            {"$group": {"_id": "$data_compra", "total_vendas": {"$sum": {"$multiply": ["$produtos.quantidade", "$produtos.preco"]}}}},
            {"$sort": {"_id": 1}}
        ])
        writeAJson(result, "Total de vendas por dia")

    def ClienteMaisGastou(self):
        result = self.db.collection.aggregate([
            {"$unwind": "$produtos"},
            {"$group": {"_id": "$produtos.descricao", "quantidade_total": {"$sum": "$produtos.quantidade"}}},
            {"$sort": {"quantidade_total": -1}},
            {"$limit": 1}
        ])
        writeAJson(result, "Cliente mais gastou")

    def ListaAcimaDe1Vendido(self):
        result = self.db.collection.aggregate([
            {"$unwind": "$produtos"},
            {"$group": {"_id": "$produtos.descricao", "quantidade_total": {"$sum": "$produtos.quantidade"}}},
            {"$match": {"quantidade_total": {"$gt": 1}}}
        ])
        writeAJson(result, "Produtos que venderam mais de 1 unidade")
