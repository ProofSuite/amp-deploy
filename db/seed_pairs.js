const utils = require('ethers').utils
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
          baseTokenSymbol: token.symbol,
          baseTokenAddress: utils.getAddress(token.contractAddress),
          baseTokenDecimal: 18,
          quoteTokenSymbol: quote.symbol,
          quoteTokenAddress: utils.getAddress(quote.contractAddress),
          quoteTokenDecimal: 18,
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