const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'

const getPriceMultiplier = (baseTokenDecimals, quoteTokenDecimals) => {
  let defaultPricepointMultiplier = utils.bigNumberify(1e9)
  let decimalsPricepointMultiplier = utils.bigNumberify((10 ** (baseTokenDecimals - quoteTokenDecimals)).toString())

  return defaultPricepointMultiplier.mul(decimalsPricepointMultiplier)
}

let client, db


const seed = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')

    let pairs = []

    const tokens = await db.collection('tokens')
      .find(
        { quote: false },
        { symbol: 1, contractAddress: 1, decimals: 1 }
      )
      .toArray()

    const quotes = await db.collection('tokens')
      .find(
        { quote: true },
        { symbol: 1, contractAddress: 1, decimals: 1, makeFee: 1, takeFee: 1 }
      )
      .toArray()

    
    quotes.forEach(quote => {
      tokens.forEach(token => {
        pairs.push({
          baseTokenSymbol: token.symbol,
          baseTokenAddress: utils.getAddress(token.contractAddress),
          baseTokenDecimals: token.decimals,
          quoteTokenSymbol: quote.symbol,
          quoteTokenAddress: utils.getAddress(quote.contractAddress),
          quoteTokenDecimals: quote.decimals,
          priceMultiplier: getPriceMultiplier(token.decimals, quote.decimals),
          active: true,
          makeFee: quote.makeFee,
          takeFee: quote.takeFee,
          createdAt: Date(),
          updatedAt: Date()
        })
      })
    })

    const response = await db.collection('pairs').insertMany(pairs)
    console.log(response)

  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

seed()