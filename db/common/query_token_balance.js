const MongoClient = require('mongodb').MongoClient
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'

let client, db

const query = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')

    const response = await db.collection('accounts').aggregate([
      { $match: { "address": "0x44809695706c252435531029b1e9d7d0355d475f" }},
      { $group: { "tokenBalances": "$tokenBalances" }}
    ]).toArray()
    console.log(response)

  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

query()