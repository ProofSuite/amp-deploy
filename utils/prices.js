const faker = require('faker')
const dateFns = require('date-fns')
const { randomDecimal, randomInt } = require('../utils/helpers')
const { utils } = require('ethers')

const volatility = 0.05
const rand = () => faker.random.number(100) / 100


const computeNextPrice = (oldPrice) => {
  console.log(oldPrice)
  let changePercent = 2 * volatility * rand()
  if (changePercent > volatility) changePercent -= 2 * volatility
  let changeAmount = oldPrice * changePercent
  let newPrice = oldPrice + changeAmount


  return newPrice
}

const generateTimestamps = (start, end, interval) => {
  start = start || new Date(2018, 1, 1).getTime()
  end = end || Date.now()
  interval = interval || 'hour'

  let intervalInSeconds

  switch (interval) {
    case 'second':
      intervalInSeconds = 1 * 1000
      break
    case 'minute':
      intervalInSeconds = 60 * 1000
      break
    case 'hour':
      intervalInSeconds = 60 * 60 * 1000
      break
    case 'day':
      intervalInSeconds = 60 * 60 * 24 * 1000
      break
    default:
      throw new Error('Error')
  }

  let currentTimestamp = start
  let timestamps = []

  while (currentTimestamp < end) {
    currentTimestamp += intervalInSeconds
    timestamps.push(currentTimestamp)
  }

  return timestamps
}


const generatePrices = (timestamps, initialPrice, volatility) => {
  initialPrice = initialPrice || randomDecimal(0.001, 100)
  volatility = volatility || 0.03

  console.log(initialPrice)

  let pricesArray = [ {timestamp: timestamps[0], price: initialPrice }]

  let result = timestamps.slice(1).reduce((result, timestamp) => {
    let nextPrice = computeNextPrice(result[result.length - 1].price)
    console.log(nextPrice)
    pricesArray.push({ timestamp: timestamp, price: nextPrice })
    return pricesArray
  }, pricesArray)

  return result
}


const generatePricingData = ({ start, end, interval, initialPrice, volatility }) => {
  start = start || new Date(2016, 1, 1).getTime()
  end = end || Date.now()
  intialPrice = 1
  volatility = volatility || 0.03
  interval = interval || 'hour'

  let timestamps = generateTimestamps(start, end, interval)
  let pricingData = generatePrices(timestamps, initialPrice)

  return pricingData
}

const computePricepoint = (pricepoint, priceMultiplier, quoteMultiplier) => {
  let precisionMultiplier = utils.bigNumberify(1e9)
  let a = (pricepoint * precisionMultiplier).toFixed(0)
  let b = utils.bigNumberify(a)
  
  return b.mul(priceMultiplier).mul(quoteMultiplier).div(precisionMultiplier)
}


const interpolatePrice = (pricingData, timestamp) => {
  let start = pricingData[0].timestamp
  let timestampInterval = pricingData[1].timestamp - pricingData[0].timestamp
  let numberOfIntervalsFromStart = Math.floor((timestamp - start) / timestampInterval)
  let previousTimestampIndex = numberOfIntervalsFromStart
  let nextTimestampIndex = numberOfIntervalsFromStart + 1

  let previousPrice = pricingData[previousTimestampIndex] ? pricingData[previousTimestampIndex].price : pricingData[0].price
  let nextPrice = pricingData[nextTimestampIndex] ? pricingData[nextTimestampIndex].price : pricingdata[pricingData.length-1].price
  let previousTimestamp = pricingData[previousTimestampIndex] ? pricingData[previousTimestampIndex].timestamp : pricingData[0].timestamp
  let nextTimestamp = pricingData[nextTimestampIndex] ? pricingData[nextTimestampIndex].timestamp : pricingData[pricingData.length - 1].timestamp
  let interpolatedPrice = previousPrice + (nextPrice - previousPrice) * (timestamp - previousTimestamp)/(nextTimestamp - previousTimestamp)

  return interpolatedPrice
}

module.exports = { generatePricingData, interpolatePrice }

let start = new Date(2018, 1, 1).getTime()
let end = Date.now()
let pricingData = generatePricingData({ start, end })

console.log(pricingData[100])
// let pp1 = pricingData[0]
// let r1 = randomDecimal(0.001, 100)
// let computedpp = computePricepoint(pp1.price, utils.bigNumberify(10).pow(18), utils.bigNumberify(10).pow(18))

// console.log(computedpp.toString() / 1e36)
