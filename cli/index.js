// const fetch = require('node-fetch')
// const ws = require('ws')
// const url = 'http://127.0.0.1:8081'

// const main = async () => {
//   try {
//     let response = await fetch(`${url}/tokens`)
//     let tokens = await response.json()
//     console.log(tokens)
//   }
//   catch (e) {
//     console.log(e)
//   }
// }

// const getTokens = async () => {
//   const response = await fetch(`${url}/tokens`)
//   const tokens = await response.json()
//   console.log(tokens)
// }

// const getPairs = async () => {
//   const response = await fetch(`${url}/pairs`)
//   const pairs = await response.json()
//   console.log(pairs)
// }

// const getPair = async (baseTokenAddress, quoteTokenAddress) => {
//   const response = await fetch(`${url}/pairs/${baseTokenAddress}/${quoteTokenAddress}`)
//   const pair = await response.json()
//   console.log(pair)
// }

// const getPairOrderBook = async (baseTokenAddress, quoteTokenAddress) => {
//   const response = await fetch(`${url}/pairs/book/${baseTokenAddress}/${quoteTokenAddress}`)
//   const ob = await response.json()
//   console.log(ob)
// }

// const createToken = async (baseTokenAddress, quoteTokenAddress) => {
//   const rawResponse = await fetch(`${url}/tokens`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       "baseToken": baseTokenAddress,
//       "quoteToken": quoteTokenAddress
//     })
//   })

//   const content = await rawResponse.json()
//   console.log(content)
// }


// const createAddress = async (address) => {
//   const rawResponse = await fetch(`${url}/address`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       "address": address
//     })
//   })

//   const content = await rawResponse.json()
//   console.log(content)
// }

// const getBalances = async (address) => {
//   const response = await fetch(`${url}/balances/${address}`)
//   const balances = await response.json()
//   console.log(balances)
// }

// const getOrders = async (address) => {
//   const response = await fetch(`${url}/orders/${address}`)
//   const orders = await response.json()
//   console.log(orders)
// }

// const getTradeHistory = async (baseTokenAddress, quoteTokenAddress) => {
//   const response = await fetch(`${url}/trades/history/${baseTokenAddress}/${quoteTokenAddress}`)
//   const tradeHistory = await response.json()
// }

// const getTrades = async (address) => {
//   const response = await fetch(`${url}/trades/${address}`)
//   const trades = await response.json()
//   console.log(trades)
// }

// const getTradesTicks = async (baseTokenAddress, quoteTokenAddress, start, end, duration, units) => {
//   const response = await fetch(`${url}/trades/ticks/`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       "pair": [{
//         "baseToken": baseTokenAddress,
//         "quoteToken": quoteTokenAddress
//       }],
//       "from": start,
//       "to": end,
//       "duration": units,
//       "units": units
//     })
//   })
// }

// const rand = (min, max, decimals = 4) => {
//   return (Math.random() * (max - min) + min).toFixed(decimals);
// };

// const randInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const newOrder = ({ userAddress, amount, price, side, sellToken, buyToken }) => ({
//   userAddress,
//   amount,
//   price,
//   side,
//   sellToken,
//   buyToken,
//   nonce: randInt(1, 10000),
//   signature: ''
// })

// const OrderFactory = (userAddress, sellToken, buyToken) => ({
//   create: () => ({
//     userAddress,
//     amount: randInt(1, 100000),
//     price: randInt(1, 1000),
//     sellToken,
//     buyToken,
//     nonce: randInt(1, 10000),
//     signature: ''
//   })
// })

// let REP = '0x1985365e9f78359a9B6AD760e32412f4a445E862'
// let WETH = '0x2eb24432177e82907de24b7c5a6e0a5c03226135'
// let account = '0xe8e84ee367bc63ddb38d3d01bccef106c194dc47'

// const Websocket = new ws(`${url}/socket`)
// const factory = OrderFactory(account, REP, WETH)


// let order1 = factory.create()
// let order2 = factory.create()



// const createNewOrderMessage = (order) => {
//   return JSON.stringify({
//     channel: "order_channel",
//     message: {
//       msgType: "new_order",
//       data: {
//         userAddress: order.userAddress,
//         amount: order.amount,
//         price: order.price,
//         sellToken: order.sellToken,
//         buyToken: order.buyToken,
//         nonce: order.nonce,
//         signature: order.signature
//       }
//     }
//   })
// }

// const sendNewOrderMessage = (order) => {
//   let message = createNewOrderMessage(order)

//   console.log(message)

//   // Websocket.on('open', () => Websocket.send(message))
// }


// Websocket.on('message', msg => console.log(msg))


// sendNewOrderMessage(order1)


// // const SubscribeMessage = ()



// // const ws = require('ws')
// // const w = new ws('wss://ws.cex.io/ws/')

// // w.on('message', (msg) => console.log(msg))


// // let msg = JSON.stringify({
// //   "e": "init-ohlcv",
// //   "i": "1m",
// //   "rooms": [
// //      "pair-BTC-USD"
// //   ]
// // })

// // w.on('open', () => w.send(msg))