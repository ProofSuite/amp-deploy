const quotes = require('../data/quotes.json')
const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

let client, db, documents, response

const seed = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')
    documents = Object.values(quotes).map((token) => ({
      symbol: token.symbol,
      contractAddress: utils.getAddress(token.address),
      decimals: 18,
      quote: true,
      createdAt: Date(),
      updatedAt: Date()
    }))

    response = await db.collection('tokens').insertMany(documents)
    console.log(response)

  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

seed()