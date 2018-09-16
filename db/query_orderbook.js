const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const utils = require('ethers').utils

const query = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
  const db = client.db('proofdex')

  const pairs = await db.collection('pairs').find().toArray()
  const pair = pairs[0]

  const bids = await db.collection('orders').aggregate([
    { $match: {
      "status": { $in: [ "OPEN", "PARTIALLY_FILLED" ]},
      "baseToken": utils.getAddress(pair.baseTokenAddress),
      "quoteToken": utils.getAddress(pair.quoteTokenAddress),
      "side": "BUY"
    }},
    {
      $group: {
        "_id": "$pricepoint",
        "amount": {
          $sum: {
            $subtract: [ { $toDecimal: "$amount" } , { $toDecimal: "$filledAmount" }]
          },
        },
      },
    },
    {
      $sort: {
        "_id": 1
      }
    },
    {
      $project: {
        "_id": 0,
        "pricepoint": "$_id",
        "amount": { $toString: "$amount" }
      }
    }
  ]).toArray()

  const asks = await db.collection('orders').aggregate([
    { $match: {
      "status": { $in: [ "OPEN", "PARTIALLY_FILLED" ]},
      "baseToken": utils.getAddress(pair.baseTokenAddress),
      "quoteToken": utils.getAddress(pair.quoteTokenAddress),
      "side": "SELL"
    }},
    {
      $group: {
        "_id": "$pricepoint",
        "amount": {
          $sum: {
            $subtract: [ { $toDecimal: "$amount" }, { $toDecimal: "$filledAmount" }]
          },
        },
      },
    },
    {
      $sort: {
        "_id": 1
      }
    },
    {
      $project: {
        "_id": 0,
        "pricepoint": "$_id",
        "amount": { $toString: "$amount" }
      }
    }
  ]).toArray()

  console.log(asks)
  console.log(bids)
}

query()



    // const response = await db.collection('accounts').aggregate([
    //   { $match: { "address": "0x44809695706c252435531029b1e9d7d0355d475f" }},
    //   { $group: { "tokenBalances": "$tokenBalances" }}
    // ]).toArray()

    // console.log(response)
    // const response = await db.collection('accounts').find({
    //   "address": "0x44809695706c252435531029b1e9d7d0355d475f",
    //   "tokenBalances.tokenAddress": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
    // }, { "tokenBalances.$": 1 }).toArray()
