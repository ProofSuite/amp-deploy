const utils = require('ethers').utils
const argv = require('yargs').argv
const MongoClient = require('mongodb').MongoClient
const { getNetworkID, getPriceMultiplier, getMongoURI, getPairRank } = require('../utils/helpers')
const { makeFees, takeFees } = require('../config')

const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoUsername = argv.mongo_username
const mongoPassword = argv.mongo_password
const environment = argv.amp_environment
const network = argv.network

let mongoURI

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword, environment)
} else {
  mongoURI = mongoUrl 
}

let client, db, response
const networkID = getNetworkID(network)

const seed = async () => {
  try {
    client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
    db = client.db('proofdex')
    let pairs = []

    const tokens = await db.collection('tokens')
      .find(
        { quote: false },
        { symbol: 1, address: 1, decimals: 1 }
      )
      .toArray()

    const quotes = await db.collection('tokens')
      .find(
        { quote: true },
        { symbol: 1, address: 1, decimals: 1, makeFee: 1, takeFee: 1 }
      )
      .toArray()

    
    quotes.forEach((quote, i) => {
      let nextQuotes = quotes.slice(i+1)

      nextQuotes.forEach(nextQuote => {
        pairs.push({
          baseTokenSymbol: nextQuote.symbol,
          baseTokenAddress: utils.getAddress(nextQuote.address),
          baseTokenDecimals: nextQuote.decimals,
          quoteTokenSymbol: quote.symbol,
          quoteTokenAddress: utils.getAddress(quote.address),
          quoteTokenDecimals: quote.decimals,
          active: true,
          listed: true,
          makeFee: makeFees[quote.symbol].toString(),
          takeFee: takeFees[quote.symbol].toString(),
          rank: getPairRank(nextQuote.symbol, quote.symbol),
          createdAt: Date(),
          updatedAt: Date()
        })
      })


      tokens.forEach(token => {
        pairs.push({
          baseTokenSymbol: token.symbol,
          baseTokenAddress: utils.getAddress(token.address),
          baseTokenDecimals: token.decimals,
          quoteTokenSymbol: quote.symbol,
          quoteTokenAddress: utils.getAddress(quote.address),
          quoteTokenDecimals: quote.decimals,
          active: true,
          listed: true,
          makeFee: makeFees[quote.symbol].toString(),
          takeFee: takeFees[quote.symbol].toString(),
          rank: getPairRank(token.symbol, quote.symbol),
          createdAt: Date(),
          updatedAt: Date()
        })
      })
    })

    const response = await db.collection('pairs').insertMany(pairs)
  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

seed()