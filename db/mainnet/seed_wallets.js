const { keys } = require('../data/keys.json')
const ethers = require('ethers')
const utils = ethers.utils
const Wallet = ethers.Wallet
const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'

let client, db, documents, response

const seed = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')
    documents = []

    keys.forEach(key => {
      let walletRecord = {}
      wallet = new Wallet(key)

      walletRecord.privateKey = wallet.privateKey.slice(2)
      walletRecord.address = utils.getAddress(wallet.address)
      walletRecord.admin = true
      walletRecord.operator = true
      documents.push(walletRecord)
    })

    response = await db.collection('wallets').insertMany(documents)
    console.log(response)

  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

seed()