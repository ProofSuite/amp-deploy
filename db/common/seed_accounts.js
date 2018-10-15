const { addresses } = require('../data/addresses.json')
const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let client, db


const seed = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')

    const tokens = await db.collection('tokens').find(
      { },
      { _id: 1, contractAddress: 1 }
    ).toArray()

    let documents = []

    addresses.forEach(address => {
      let account = {}
      account.address = utils.getAddress(address)

      let tokenBalances = {}

      tokens.forEach(token => {
        tokenBalances[utils.getAddress(token.contractAddress)] = {
          id: token._id,
          address: utils.getAddress(token.contractAddress),
          symbol: token.symbol,
          balance: "10000000000000000000000000000",
          allowance: "10000000000000000000000000000",
          lockedBalance: "0",
          pendingBalance: "0",
        }
      })

      account.tokenBalances = tokenBalances
      account.isBlocked = false

      documents.push(account)
    })

    const response = await db.collection('accounts').insertMany(documents)
    console.log(response)

  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

seed()