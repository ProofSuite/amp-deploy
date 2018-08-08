const tokens = require('../data/tokens.json')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const seed = async () => {
  try {
    let pairs = []
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')

    const tokens = await db.collection('tokens')
      .find(
        { quote: false },
        { symbol: 1, contractAddress: 1 }
      )
      .toArray()

    const quotes = await db.collection('tokens')
      .find(
        { quote: true },
        { symbol: 1, contractAddress: 1 }
      )
      .toArray()


    quotes.forEach(quote => {
      tokens.forEach(token => {
        pairs.push({
          baseTokenId: token._id,
          baseTokenSymbol: token.symbol,
          baseTokenAddress: token.contractAddress,
          quoteTokenId: quote._id,
          quoteTokenSymbol: quote.symbol,
          quoteTokenAddress: quote.contractAddress,
          active: true,
          makerFee: 0,
          takerFee: 0,
          createdAt: Date(),
          updatedAt: Date()
        })
      })
    })

    const response = await db.collection('pairs').insertMany(pairs)
    client.close()

    console.log(response)
  } catch (e) {
    console.log(e.message)
  }
}

seed()