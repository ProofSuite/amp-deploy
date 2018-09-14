const { keys } = require('../data/keys.json')
const ethers = require('ethers')
const utils = ethers.utils
const Wallet = ethers.Wallet
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const seed = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')

    let documents = []


    keys.forEach(key => {
      let walletRecord = {}
      wallet = new Wallet(key)

      walletRecord.privateKey = wallet.privateKey.slice(2)
      walletRecord.address = utils.getAddress(wallet.address)
      walletRecord.admin = true
      walletRecord.operator = true
      documents.push(walletRecord)
    })

    const response = await db.collection('wallets').insertMany(documents)
    console.log(response)
    client.close()
  } catch (e) {
    console.log(e.message)
  }
}

seed()