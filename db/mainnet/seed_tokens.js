const { quoteTokens, baseTokens, addresses, decimals } = require('../../config')
const utils = require('ethers').utils
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const fs = require('fs')
const process = require('process')


let documents = []
let mainnetAddresses = addresses['4']

const seed = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')
    documents = baseTokens.map((symbol) => ({
      symbol,
      contractAddress: utils.getAddress(mainnetAddresses[symbol]),
      decimals: decimals[symbol],
      quote: false,
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