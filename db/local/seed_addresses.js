const { addresses } = require('../data/addresses.json')
const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'

const seed = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
    const documents = addresses.map((address) => ({
      address: utils.getAddress(address),
      createdAt: Date(),
      updatedAt: Date()
    }))

    const response = await db.collection('addresses').insertMany(documents)
    client.close()

    console.log(response)
  } catch (e) {
    console.log(e.message)
  }
}

seed()