const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const query = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
    const response = await db.collection('accounts').aggregate([
      { $match: { "address": "0x44809695706c252435531029b1e9d7d0355d475f" }},
      { $group: { "tokenBalances": "$tokenBalances" }}
    ]).toArray()

    console.log(response)
    // const response = await db.collection('accounts').find({
    //   "address": "0x44809695706c252435531029b1e9d7d0355d475f",
    //   "tokenBalances.tokenAddress": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
    // }, { "tokenBalances.$": 1 }).toArray()

  } catch (e) {
    console.log(e)
  }
}

query()