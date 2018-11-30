const argv = require('yargs').argv
const utils = require('ethers').utils
const MongoClient = require('mongodb').MongoClient
const faker = require('faker')
const { testAccounts: addresses } = require('../config')
const { generatePricingData, interpolatePrice } = require('../utils/prices')
const { getMongoURI, randomInt } = require('../utils/helpers')

const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoUsername = argv.mongo_username
const mongoPassword = argv.mongo_password

let mongoURI

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword)
} else {
  mongoURI = mongoUrl 
}

let exchangeAddress = '0x7400d4d4263a3330beeb2a0d2674f0456054f217'
let minAmount = 0.1
let maxAmount = 10000
let ether = 1e18

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomSide = () => (randInt(0, 1) === 1 ? 'BUY' : 'SELL')
const randomHash = () => utils.sha256(utils.randomBytes(100))
const randomElement = (arr) => arr[randInt(0, arr.length-1)]

const randomPricepoint = (priceMultiplier, quoteMultiplier) => {
  let precisionMultiplier = utils.bigNumberify(1e9)
  let a = randomDecimal(0.0001, 200)
  let b = a * precisionMultiplier
  let c = b.toFixed(0)
  let d = utils.bigNumberify(c)
  let e = d.mul(priceMultiplier).mul(quoteMultiplier).div(precisionMultiplier)

  return e  
}

const computePricepoint = (pricepoint, priceMultiplier, quoteMultiplier) => {
  let precisionMultiplier = utils.bigNumberify(1e9)
  let a = (pricepoint * precisionMultiplier).toFixed(0)
  let b = utils.bigNumberify(a)
  
  return b.mul(priceMultiplier).mul(quoteMultiplier).div(precisionMultiplier)
}

const randomPricepointRange = (priceMultiplier, quoteMultiplier) => {
  let a = randomPricepoint(priceMultiplier, quoteMultiplier)
  let b = randomPricepoint(priceMultiplier, quoteMultiplier)
  let min = minBig(a, b)
  let max = maxBig(a, b)

  return { min, max }
}

const randomAmount = (baseMultiplier) => {
  let amount = utils.bigNumberify(randomInt(0, 100000))
  let bigAmount = amount.mul(baseMultiplier).div("100")
  return bigAmount
}

const seed = async () => {
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
  const db = client.db('proofdex')

  const pairDocuments = await db.collection('pairs').find({ quoteTokenSymbol: "WETH", baseTokenSymbol: "AE" }, {
    baseTokenSymbol: 1,
    baseTokenAddress: 1,
    quoteTokenSymbol: 1,
    quoteTokenAddress: 1,
    baseTokenDecimals: 1,
    quoteTokenDecimals: 1,
    pairMultiplier: 1
  }).toArray()

  let pairs = []

  pairDocuments.forEach(pair => {
    let baseMultiplier = utils.bigNumberify(10).pow(pair.baseTokenDecimals)
    let quoteMultiplier = utils.bigNumberify(10).pow(pair.quoteTokenDecimals)
    let priceMultiplier = utils.bigNumberify(10).pow(18)

    pairs.push({
      baseTokenAddress: pair.baseTokenAddress,
      baseTokenSymbol: pair.baseTokenSymbol,
      quoteTokenAddress: pair.quoteTokenAddress,
      quoteTokenSymbol: pair.quoteTokenSymbol,
      baseMultiplier,
      quoteMultiplier,
      priceMultiplier
    })
  })

  for (let pair of pairs) {
    let trades = []
    let start = new Date(2018, 6, 1).getTime()
    let end = Date.now()
    let pricingData = generatePricingData({ start, end })
    let numberOfOrders = 1000

    for (let i = 0; i < numberOfOrders; i++) {
      let taker = randomElement(addresses)
      let maker = randomElement(addresses.filter(address => address !== taker))
      let makerOrderHash = randomHash()
      let hash = randomHash()
      let amount = randomAmount(pair.baseMultiplier)
      let status = 'SUCCESS'
      let txHash = randomHash()
      let takerOrderHash = randomHash()
      let pairName = `${pair.baseTokenSymbol}/${pair.quoteTokenSymbol}`
      let side = randomSide()
      let createdAt = new Date(faker.date.between(start.toString(), end.toString()))
      let timestamp = createdAt.getTime()
      let interpolatedPricepoint = interpolatePrice(pricingData, timestamp)
      let intermediatePricepoint = Math.floor(interpolatedPricepoint + interpolatedPricepoint * 0.05 * (faker.random.number(100) / 100)).toString()
      let pricepoint = computePricepoint(intermediatePricepoint, pair.priceMultiplier, pair.quoteMultiplier)

      let trade = {
        taker,
        maker,
        hash,
        baseToken: pair.baseTokenAddress,
        quoteToken: pair.quoteTokenAddress,
        makerOrderHash,
        status,
        txHash,
        takerOrderHash,
        pairName,
        pricepoint: pricepoint.toString(),
        side,
        amount,
        createdAt
      }

      trades.push(trade)
    }

    await db.collection('trades').insertMany(trades)
    console.log(`Inserted ${pair.baseTokenSymbol}/${pair.quoteTokenSymbol}`)
  }

  client.close()
}

seed()


