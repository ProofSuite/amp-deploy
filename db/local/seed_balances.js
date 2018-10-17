const addresses = require('./addresses.json')
const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'

const seed = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')

    const addresses = await db.collection('addresses')
      .find({}, { address: 1 })
      .toArray()

    const tokens = await db.collection('tokens')
      .find({}, { contractAddress: 1, _id: 1 })
      .toArray()

    const documents = addresses.map(address => ({
      address: address,
      tokens: tokens.map(token => ({
        tokenId: token._id,
        tokenAddress: utils.getAddress(token.contractAddress),
        amount: 1e18,
        lockedAmount: 0
      }))
    }))

    console.log(documents)

    const response = await db.collection('balances').insertMany(documents)
    client.close()

    console.log(response)
  } catch (e) {
    console.log(e.message)
  }
}

seed()