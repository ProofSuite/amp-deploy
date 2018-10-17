const utils = require('ethers').utils
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'

const fs = require('fs')
const process = require('process')

const truffleBuildPath = process.argv[2] || path.join(`${process.env.AMP_DEX_PATH}`, `/build/contracts`)

let documents = []
let tokenSymbol
let json = JSON.parse(fs.readFileSync(`${truffleBuildPath}/${'WETH9.json'}`, 'utf8'))
let tokenAddress = json.networks["1000"].address


const seed = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
    const response = await db.collection('tokens').insertMany(documents)
    client.close()
  } catch (e) {
    console.log(e.message)
  }
}


documents.push({
  symbol: 'WETH',
  contractAddress: utils.getAddress(tokenAddress),
  decimals: 18,
  quote: true,
  createdAt: Date(),
  updatedAt: Date()
})

seed()