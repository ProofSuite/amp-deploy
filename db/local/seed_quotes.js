const fs = require('fs')
const path = require('path')
const process = require('process')
const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'


const truffleBuildPath = process.argv[2] || path.join(`${process.env.AMP_DEX_PATH}`, `/build/contracts`)
const { baseTokens, contractAddresses, decimals } = require('../../config')

let documents = []
let addresses = contractAddresses['8888']

const seed = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')

    documents = baseTokens.map((symbol) => ({
      symbol: symbol,
      contractAddress: utils.getAddress(addresses[symbol]),
      decimals: decimals[symbol],
      quote: false,
      createdAt: Date(),
      updatedAt: Date()
    }))

    const response = await db.collection('tokens').insertMany(documents)
    client.close()
  } catch (e) {
    console.log(e.message)
  }
}

seed()