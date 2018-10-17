const fs = require('fs')
const process = require('process')
const utils = require('ethers').utils
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const truffleBuildPath = process.argv[2] || path.join(`${process.env.AMP_DEX_PATH}`, `/build/contracts`)

let documents = []
let tokenSymbol

let WETHInfo = JSON.parse(fs.readFileSync(`${truffleBuildPath}/${'WETH9.json'}`, 'utf8'))
let DAIInfo = JSON.parse(fs.readFileSync(`${truffleBuildPath}/${'DAI.json'}`, 'utf8'))

let WETHAddress = WETHInfo.networks["8888"].address
let DAIAddress = DAIInfo.networks["8888"].address


const seed = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')

    const weth = {
      symbol: "WETH",
      contractAddress: utils.getAddress(WETHAddress),
      decimals: 18,
      quote: true,
      createdAt: Date(),
      updatedAt: Date()
    }

    const dai = {
      symbol: "DAI",
      contractAddress: utils.getAddress(DAIAddress),
      decimals: 18,
      quote: true,
      createdAt: Date(),
      updatedAt: Date()
    }

    await db.collection('tokens').update({ symbol: "WETH" }, weth, { upsert: true })
    await db.collection('tokens').update({ symbol: "DAI" }, dai, { upsert: true })

    client.close()
  } catch (e) {
    console.log(e.message)
  }
}

seed()