{
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'titulo',
        'autor',
        'ano',
        'preco'
      ],
      properties: {
        _id: {
            bsonType: 'int',
            description: 'deve ser um inteiro'
        },
        titulo: {
          bsonType: 'string',
          description: 'deve ser uma string e é obrigatório'
        },
        autor: {
          bsonType: 'string',
          description: 'deve ser uma string e é obrigatório'
        },
        ano: {
            bsonType: 'int',
            description: 'deve ser um inteiro e é obrigatório'
          },
        preco: {
            bsonType: 'double',
            description: 'deve ser um double e é obrigatório'
          }
      }
    }
  }