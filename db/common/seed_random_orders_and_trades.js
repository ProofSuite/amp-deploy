const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const faker = require('faker')
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'
const { generatePricingData , interpolatePrice } = require('../utils/prices')

let { addresses } = require('../data/addresses.json')
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

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomSide = () => (randInt(0, 1) === 1 ? 'BUY' : 'SELL')
const randomOrderType = () => orderTypes[randInt(0, orderTypes.length -1 )]
const randomPair = () => pairs[randInt(0, 5)]
const randomFee = () => rand(10000, 100000)


const randomBigAmount = () => {
  let ether = utils.bigNumberify("1000000000000000000")
  let amount = utils.bigNumberify(randInt(0, 100000))
  let bigAmount = amount.mul(ether).div("100").toString()

  return bigAmount
}




const randomAmount = () => rand(minAmount, maxAmount)
const randomRatio = () => rand(0, 1)
const randomTimestamp = () => randInt(minTimeStamp, maxTimeStamp)
const randomPrice = () => rand(minPrice, maxPrice)

const randomAddress = () => randomHash().slice(0, 42);
const randomElement = (arr) => arr[randInt(0, arr.length-1)]

const randomPricepointRange = () => {
  let a = randInt(10000, 10000000)
  let b = randInt(10000, 10000000)
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return { min, max }
}

const randomQuoteToken = (quotes) => quotes[randInt(0, len(quotes)-1)]
const randomToken = (tokens) => tokens[randInt(0, len(tokens)-1)]


const randomOrderStatus = () => {
  let nb = randInt(0, 100)

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
  let nb = randInt(0, 100)
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
    pairs = pairs.slice(0,4)
    addresses = addresses.slice(0,4)

    for (let i = 0; i < 200; i++) {
      let pair = randomElement(pairs)
      let side = randomSide()
      let buyTokenAddress = (side == "BUY") ? pair.baseTokenAddress : pair.quoteTokenAddress
      let baseToken = pair.baseTokenAddress
      let quoteToken = pair.quoteTokenAddress
      let sellTokenAddress = (side == "SELL") ? pair.quoteTokenAddress : pair.baseTokenAddress
      let buyTokenSymbol = (side == "BUY") ? pair.baseTokenSymbol : pair.quoteTokenSymbol
      let sellTokenSymbol = (side == "SELL") ? pair.quoteTokenSymbol : pair.quoteTokenAddress
      let hash = randomHash()
      let status = randomOrderStatus()
      let buyAmount = randomBigAmount()
      let sellAmount = randomBigAmount()
      let amount = (side == "BUY") ? buyAmount : sellAmount
      let pricepoint = String(randInt(pair.minPricepoint, pair.maxPricepoint))
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
          filledAmount = String(randInt(0, amount))
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
        buyToken: utils.getAddress(buyTokenAddress),
        sellToken: utils.getAddress(sellTokenAddress),
        baseToken: utils.getAddress(baseToken),
        quoteToken: utils.getAddress(quoteToken),
        pairName,
        buyAmount,
        sellAmount,
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

    let filledAndPartiallyFilledOrders = orders.filter(order => order.filledAmount != 0)
    let trades = []

    filledAndPartiallyFilledOrders.forEach(order => {
      let possibleTakers = addresses.filter(address => address != order.userAddress)
      let matchNum = randInt(0, 3) //each filled/partially filled order has between 0 and 3 possible orders that have been matched
      let remainingAmount = order.amount

      for(let i = 0; i < matchNum; i++) {
        let tradeAmount = (i == matchNum - 1) ? remainingAmount : String(randInt(0, remainingAmount))
        let taker = randomElement(possibleTakers)
        let maker = order.userAddress
        let orderHash = order.hash
        let hash = randomHash()
        let status = randomTradeStatus()
        let txHash = ((['SUCCESS', 'ERROR'].indexOf(status) != -1) ? randomHash() : "") //txhash is only present if tx has been sent (=> success or error)
        let takerOrderHash = randomHash()
        let pairName = order.pairName
        let pricepoint = order.pricepoint
        let side = order.side
        let createdAt = new Date(faker.fake("{{date.recent}}"))

        let trade = {
          taker,
          maker,
          hash,
          baseToken: order.baseToken,
          quoteToken: order.quoteToken,
          orderHash: order.hash,
          status,
          txHash,
          takerOrderHash,
          pairName: order.pairName,
          pricepoint: order.pricepoint,
          side: order.side,
          amount: tradeAmount,
          createdAt
        }

        trades.push(trade)
      }
    })

    const ordersInsertResponse = await db.collection('orders').insertMany(orders)
    const tradeInsertResponse = await db.collection('trades').insertMany(trades)

    client.close()
}

seed()