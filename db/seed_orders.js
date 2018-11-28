const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const faker = require('faker')
const argv = require('yargs').argv
const { generatePricingData , interpolatePrice } = require('../utils/prices')
const { getMongoURI, minBig, maxBig, randomBig, averageBig, randomDecimal, randomInt, randomRatio } = require('../utils/helpers')

const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoUsername = argv.mongo_username
const mongoPassword = argv.mongo_password

let mongoURI

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword)
} else {
  mongoURI = mongoUrl 
}

let client, db, response

let { testAccounts } = require('../config')
let exchangeAddress = "0x7400d4d4263a3330beeb2a0d2674f0456054f217"
let minTimeStamp = 1500000000000
let maxTimeStamp = 1520000000000
let minAmount = 0.1
let maxAmount = 10000
let minPrice = 100
let maxPrice = 100000
let ether = 1e18

let orderStatuses = ['NEW', 'OPEN', 'CANCELLED', 'PARTIALLY_FILLED', 'FILLED', 'EXECUTED']
let tradeStatuses = ['PENDING', 'SUCCESS', 'ERROR', 'INVALID']
let orderTypes = ['MARKET', 'LIMIT']

let orderWeightedStatuses = [
  {
    name: 'NEW',
    probability: 0.0
  },
  {
    name: 'OPEN',
    probability: 0.20
  },
  {
    name: 'CANCELLED',
    probability: 0.05
  },
  {
    name: 'ERROR',
    probability: 0.05
  },
  {
    name: 'PARTIALLY_FILLED',
    probability: 0.20
  },
  {
    name: 'FILLED',
    probability: 0.20
  },
  {
    name: 'EXECUTED',
    probability: 0.30
  },
]

let tradeWeightedStatuses = [
  {
    name: 'PENDING',
    probability: 0.20
  },
  {
    name: 'SUCCESS',
    probability: 0.70
  },
  {
    name: 'ERROR',
    probability: 0.05
  },
  {
    name: 'INVALID',
    probability: 0.05
  }
]

let orderLevels = orderWeightedStatuses.reduce((result, current) => {
  let len = result.length
  len > 0 ? result.push(result[result.length - 1] + current.probability) : result.push(current.probability)
  return result
 }, [])
 .map(elem => elem * 100)

 let tradeLevels = tradeWeightedStatuses.reduce((result, current) => {
  let len = result.length
  len > 0 ? result.push(result[result.length - 1] + current.probability) : result.push(current.probability)
  return result
 }, [])
 .map(elem => elem * 100)


const randomSide = () => (randomInt(0, 1) === 1 ? 'BUY' : 'SELL')
const randomOrderType = () => orderTypes[randomInt(0, orderTypes.length -1 )]
const randomPair = () => pairs[randomInt(0, pairs.length-1)]
const randomFee = () => randomDecimal(10000, 100000)
const randomHash = () => utils.sha256(utils.randomBytes(100))

const randomTimestamp = () => randomInt(minTimeStamp, maxTimeStamp)
const randomPrice = () => randomDecimal(minPrice, maxPrice)

const randomAddress = () => randomHash().slice(0, 42);
const randomElement = (arr) => arr[randomInt(0, arr.length-1)]

const randomAmount = (baseMultiplier) => {
  let amount = utils.bigNumberify(randomInt(0, 100000))
  let bigAmount = amount.mul(baseMultiplier).div("100")
  return bigAmount
}

const randomPricepoint = (priceMultiplier, quoteMultiplier) => {
  let precisionMultiplier = utils.bigNumberify(1e9)
  let a = randomDecimal(0.0001, 200)
  let b = a * precisionMultiplier
  let c = b.toFixed(0)
  let d = utils.bigNumberify(c)
  let e = d.mul(priceMultiplier).mul(quoteMultiplier).div(precisionMultiplier)

  return e  
}

const randomPricepointRange = (priceMultiplier, quoteMultiplier) => {
  let a = randomPricepoint(priceMultiplier, quoteMultiplier)
  let b = randomPricepoint(priceMultiplier, quoteMultiplier)
  let min = minBig(a, b)
  let max = maxBig(a, b)

  return { min, max }
}

const randomQuoteToken = (quotes) => quotes[randomInt(0, len(quotes)-1)]
const randomToken = (tokens) => tokens[randomInt(0, len(tokens)-1)]


const randomOrderStatus = () => {
  let nb = randomInt(0, 100)

  switch(true) {
    case (nb < orderLevels[0]):
      return orderWeightedStatuses[0].name
      break
    case (nb < orderLevels[1]):
      return orderWeightedStatuses[1].name
      break
    case (nb < orderLevels[2]):
      return orderWeightedStatuses[2].name
      break
    case (nb < orderLevels[3]):
      return orderWeightedStatuses[3].name
      break
    case (nb < orderLevels[4]):
      return orderWeightedStatuses[4].name
      break
    case (nb < orderLevels[5]):
      return orderWeightedStatuses[5].name
      break
    default:
      return orderWeightedStatuses[6].name
  }
}

const randomTradeStatus = () => {
  let nb = randomInt(0, 100)
  switch(true) {
    case (nb < tradeLevels[0]):
      return tradeWeightedStatuses[0].name
      break
    case (nb < tradeLevels[1]):
      return tradeWeightedStatuses[1].name
      break
    case (nb < tradeLevels[2]):
      return tradeWeightedStatuses[2].name
      break
    default:
      return tradeWeightedStatuses[3].name
  }
}

const seed = async () => {
    let orders = []
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
    const db = client.db('proofdex')

    const docs = await db.collection('pairs')
      .find(
        {},
        { baseTokenSymbol: 1,
          baseTokenAddress: 1,
          quoteTokenSymbol: 1,
          quoteTokenAddress: 1,
          baseTokenDecimals: 1,
          quoteTokendecimals: 1,
          pairMultiplier: 1,
        }
      )
      .toArray()

    let pairs = []
    docs.forEach(pair => {
      let baseMultiplier = utils.bigNumberify(10).pow(pair.baseTokenDecimals)
      let quoteMultiplier = utils.bigNumberify(10).pow(pair.quoteTokenDecimals)
      let priceMultiplier = utils.bigNumberify(10).pow(18)
      let { min, max } = randomPricepointRange(priceMultiplier, quoteMultiplier)

      pairs.push({
        baseTokenAddress: pair.baseTokenAddress,
        baseTokenSymbol: pair.baseTokenSymbol,
        quoteTokenAddress: pair.quoteTokenAddress,
        quoteTokenSymbol: pair.quoteTokenSymbol,
        baseTokenDecimals: pair.baseTokenDecimals,
        quoteTokenDecimals: pair.quoteTokenDecimals,
        baseMultiplier,
        quoteMultiplier,
        priceMultiplier,
        minPricepoint: min,
        maxPricepoint: max,
        averagePricepoint: averageBig(min, max)
      })
    })

    
    let testpair = pairs[0]
    console.log(testpair.minPricepoint.toString())
    console.log(testpair.maxPricepoint.toString())
    console.log(testpair.averagePricepoint.toString())
    
    let a = randomBig(testpair.minPricepoint, testpair.averagePricepoint).toString()
    let b = randomBig(testpair.averagePricepoint, testpair.maxPricepoint).toString()

    console.log(a)
    console.log(b)
    
    //we choose a limited number of user accounts
    addresses = testAccounts.slice(0,4)


      for (let i = 0; i < 20000; i++) {
        let pair = randomElement(pairs)
        let side = randomSide()
        let baseToken = pair.baseTokenAddress
        let quoteToken = pair.quoteTokenAddress
        let hash = randomHash()
        let status = randomOrderStatus()
        let amount = randomAmount(pair.baseMultiplier).toString()
        let pricepoint = (side == "BUY") ? randomBig(pair.minPricepoint, pair.averagePricepoint).toString() : randomBig(pair.averagePricepoint, pair.maxPricepoint).toString()
        let userAddress = randomElement(addresses)
        let pairName = `${pair.baseTokenSymbol}/${pair.quoteTokenSymbol}`
        let makeFee = 0
        let takeFee = 0
        let filledAmount
        let createdAt = new Date(faker.fake("{{date.recent}}"))


        switch(status) {
          case "OPEN":
            filledAmount = "0"
            break
          case "NEW":
            filledAmount = "0"
            break
          case "PARTIALLY_FILLED":
            filledAmount = String(randomInt(0, amount))
            break
          case "FILLED":
            filledAmount = amount
            break
          case "INVALID":
            filledAmount = "0"
            break
          case "ERROR":
            filledAmount = "0"
            break
          default:
          filledAmount = "0"
        }

        let order = {
          exchangeAddress: utils.getAddress(exchangeAddress),
          userAddress: utils.getAddress(userAddress),
          baseToken: utils.getAddress(baseToken),
          quoteToken: utils.getAddress(quoteToken),
          pairName,
          hash,
          side,
          status,
          makeFee,
          takeFee,
          amount,
          pricepoint,
          filledAmount,
          createdAt
        }

        orders.push(order)
      }

    const ordersInsertResponse = await db.collection('orders').insertMany(orders)
    client.close()
}

seed()