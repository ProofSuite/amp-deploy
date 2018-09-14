// const tokens = require('../data/tokens.json')
const utils = require('ethers').utils
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const fs = require('fs')
const process = require('process')

const truffleBuildPath = process.argv[2] || path.resolve('../../amp-dex/build/contracts/')
// const truffleBuildPath = path.resolve('../amp-dex/build/contracts/')

console.log(truffleBuildPath)

let documents = []


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


fs.readdir(truffleBuildPath, (err, files) => {
  if (err) {
    console.error('Could not list the directory', err)
    process.exit(1)
  }

  files.forEach((file, index) => {
    let tokenAddress
    let tokenSymbol
    const json = JSON.parse(fs.readFileSync(`${truffleBuildPath}/${file}`, 'utf8'))

    if (
      json.networks["8888"] &&
      file != 'Owned.json' &&
      file != 'Exchange.json' &&
      file != 'WETH9.json' &&
      file != 'SafeMath.json'
    ) {
        tokenSymbol = file.slice(0, -5)
        tokenAddress = json.networks["8888"].address
        documents.push({
          symbol: tokenSymbol,
          contractAddress: utils.getAddress(tokenAddress),
          decimals: 18,
          quote: false,
          createdAt: Date(),
          updatedAt: Date(),
        })
      }
    })

    seed()
  }
)