const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'

const create = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })

  const db = client.db('proofdex')
  const response = await db.createCollection('addresses', {
    validator:  {
      $jsonSchema: 'object',
      required: ['address'],
      properties:  {
        address: {
          bsonType: "string",
          description: "must be a string and is not required"
        },
        nonce: {
          bsonType: "long",
        },
        isBlocked: {
          bsonType: "bool",
          description: "must be a a boolean and is not required"
        },
        createdAt: {
          bsonType: "date",
          description: "must be a date and is not required"
        },
        updatedAt: {
          bsonType: "date",
          description: "must be a date and is not required"
        }
      }
      }
    })

  console.log(response)
}

create()

