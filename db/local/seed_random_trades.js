const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'

let { addresses } = require('../data/addresses.json')
let minTimeStamp = 1500000000000
let maxTimeStamp = 1520000000000
let minAmount = 0.1
let maxAmount = 10000
let minPrice = 100
let maxPrice = 100000
let ether = 1e18

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomOrderSide = () => (randInt(0, 1) === 1 ? 'BUY' : 'SELL')
const randomOrderType = () => ['MARKET', 'LIMIT'][randInt(0, 1)]
const randomOrderStatus = () => ['NEW', 'OPEN', 'CANCELLED', 'PARTIALLY_FILLED', 'FILLED', 'EXECUTED'][randInt(0, 2)]
const randomPair = () => pairs[randInt(0, 5)]
const randomFee = () => rand(10000, 100000)
const randomBigAmount = () => String((randInt(0, 10000)/100) * ether)
const randomAmount = () => rand(minAmount, maxAmount)
const randomRatio = () => rand(0, 1)
const randomTimestamp = () => randInt(minTimeStamp, maxTimeStamp)
const randomPrice = () => rand(minPrice, maxPrice)
const randomHash = () => utils.sha256(utils.randomBytes(100))
const randomAddress = () => randomHash().slice(0, 42);
const randomElement = (arr) => arr[randInt(0, arr.length-1)]

const randomPricepointRange = () => {
  let a = randInt(100000, 100000000)
  let b = randInt(100000, 100000000)
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return { min, max }
}

const randomQuoteToken = (quotes) => quotes[randInt(0, len(quotes)-1)]
const randomToken = (tokens) => tokens[randInt(0, len(tokens)-1)]

const seed = async () => {
    let orders = []
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')

    const docs = await db.collection('pairs')
      .find(
        {},
        { baseTokenSymbol: 1,
          baseTokenAddress: 1,
          quoteTokenSymbol: 1,
          quoteTokenAddress: 1,
          pairMultiplier: 1,
        }
      )
      .toArray()

    let pairs = []
    docs.forEach(pair => {
      let { min, max } = randomPricepointRange()
      pairs.push({
        baseTokenAddress: pair.baseTokenAddress,
        baseTokenSymbol: pair.baseTokenSymbol,
        quoteTokenAddress: pair.quoteTokenAddress,
        quoteTokenSymbol: pair.quoteTokenSymbol,
        priceMultiplier: pair.priceMultiplier,
        minPricepoint: min,
        maxPricepoint: max,
      })
    })


    //we choose a limited number of pairs
    pairs = pairs.slice(0,3)
    addresses = addresses.slice(0,4)

    for (let i = 0; i < 200; i++) {
      let pair = randomElement(pairs)
      let side = randomOrderSide()
      let buyTokenAddress = (side == "BUY") ? pair.baseTokenAddress : pair.quoteTokenAddress
      let baseToken = pair.baseTokenAddress
      let quoteToken = pair.quoteTokenAddress
      let sellTokenAddress = (side == "SELL") ? pair.quoteTokenAddress : pair.baseTokenAddress
      let buyTokenSymbol = (side == "BUY") ? pair.baseTokenSymbol : pair.quoteTokenSymbol
      let sellTokenSymbol = (side == "SELL") ? pair.quoteTokenSymbol : pair.quoteTokenAddress
      let hash = randomHash()
      let status = randomOrderStatus()
      let buyTokenAmount = randomBigAmount()
      let sellTokenAmount = randomBigAmount()
      let amount = (side == "BUY") ? buyTokenAmount : sellTokenAmount
      let pricepoint = randInt(pair.minPricepoint, pair.maxPricepoint)
      let userAddress = randomElement(addresses)
      let pairName = `${pair.baseTokenSymbol}/${pair.quoteTokenSymbol}`
      let makeFee = 0
      let takeFee = 0
      let filledAmount


      switch(status) {
        case "OPEN":
          filledAmount = "0"
        case "NEW":
          filledAmount = "0"
        case "PARTIALLY_FILLED":
          filledAmount = String(randInt(0, amount))
        case "FILLED":
          filledAmount = amount
        case "INVALID":
          filledAmount = "0"
        case "ERROR":
          filledAmount = "0"
        default:
        filledAmount = "0"
      }

      let order = {
        userAddress: utils.getAddress(userAddress),
        buyToken: utils.getAddress(buyTokenAddress),
        sellToken: utils.getAddress(sellTokenAddress),
        baseToken: utils.getAddress(baseToken),
        quoteToken: utils.getAddress(quoteToken),
        pairName,
        buyTokenAmount,
        sellTokenAmount,
        hash,
        side,
        status,
        makeFee,
        takeFee,
        amount,
        pricepoint,
        filledAmount
      }

      orders.push(order)
    }

    console.log(orders)
    client.close()
}

seed()